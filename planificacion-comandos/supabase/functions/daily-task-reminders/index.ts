import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

function esc(val: unknown): string {
  return String(val ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeUrl(val: unknown): string | null {
  const s = String(val ?? "").trim();
  return /^https?:\/\//i.test(s) ? s : null;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization") || "";
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const { data: generatedCount, error: rpcErr } = await supabase.rpc("generate_daily_camp_reminders");
    if (rpcErr) throw rpcErr;

    const todayAr = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const [{ data: digests, error: digErr }, { data: members, error: memErr }] = await Promise.all([
      supabase.from("camp_reminder_digests").select("*").eq("digest_date", todayAr).order("member_name"),
      supabase.from("camp_members").select("id, name, email, notify_daily")
    ]);
    if (digErr) throw digErr;
    if (memErr) throw memErr;

    const emailByMemberId = new Map((members || []).map((m) => [m.id, m]));
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const fromEmail = Deno.env.get("REMINDER_FROM_EMAIL") || "Comandos PBC 2027 <onboarding@resend.dev>";
    const webhookUrl = Deno.env.get("REMINDER_WEBHOOK_URL");

    let emailsSent = 0;
    let webhookSent = false;

    if (resendKey && digests && digests.length > 0) {
      for (const d of digests) {
        const mem = emailByMemberId.get(d.member_id);
        if (!mem?.email || !mem.notify_daily) continue;

        const items = Array.isArray(d.tasks_snapshot) ? d.tasks_snapshot : [];
        const lines = items.map((t: Record<string, unknown>) =>
          `• Día ${t.day_number ?? "?"}: ${t.title} (${t.start_time || t.time_slot || "sin horario"})${t.doc_url ? ` — ${t.doc_url}` : ""}`
        ).join("\n");

        const htmlList = items.map((t: Record<string, unknown>) => {
          const url = safeUrl(t.doc_url);
          return `<li style="margin-bottom:6px;"><strong>Día ${esc(t.day_number ?? "?")}</strong>: ${esc(t.title)} <span style="color:#5a6b65;">(${esc(t.start_time || t.time_slot || "")})</span>${url ? ` · <a href="${esc(url)}">Ver documento ↗</a>` : ""}</li>`;
        }).join("");

        const resp = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [mem.email],
            subject: `${d.headline} · PBC 2027`,
            text: `${d.headline}:\n\n${lines}\n\nEntrá al tablero de Conducción para actualizar tus avances.`,
            html: `<div style="font-family:sans-serif;max-width:560px;margin:auto;color:#0F1614;"><h2>${esc(d.headline)}</h2><ul style="padding-left:18px;">${htmlList}</ul><p style="font-size:12px;color:#5a6b65;">Recordatorio automático cada 24 hs · Campamento Protagonistas del Bien Común 2027</p></div>`
          })
        });

        if (resp.ok) {
          emailsSent += 1;
          await supabase.from("camp_reminder_digests").update({ channel: "email" }).eq("id", d.id);
        }
      }
    }

    if (webhookUrl && digests && digests.length > 0) {
      const whResp = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: todayAr, digests })
      });
      webhookSent = whResp.ok;
    }

    return new Response(
      JSON.stringify({
        ok: true,
        digest_date: todayAr,
        generated_count: generatedCount ?? 0,
        digests_count: digests?.length ?? 0,
        emails_sent: emailsSent,
        webhook_sent: webhookSent,
        resend_configured: Boolean(resendKey),
        webhook_configured: Boolean(webhookUrl)
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
