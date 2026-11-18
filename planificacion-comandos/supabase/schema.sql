-- ============================================================================
-- Protagonistas del Bien Común 2027 · Dashboard de los 3 Comandos
-- Proyecto Supabase: pbc-2027-comandos (sa-east-1)
-- ============================================================================

-- 1. Días del campamento (Días 1 al 8 · 15 al 22 de enero de 2027)
CREATE TABLE IF NOT EXISTS public.camp_days (
  id text PRIMARY KEY,
  day_number integer NOT NULL UNIQUE CHECK (day_number BETWEEN 1 AND 8),
  date_label text NOT NULL,
  movement text NOT NULL CHECK (movement IN ('mov-1', 'mov-2')),
  title text NOT NULL,
  central_question text NOT NULL,
  formation_axis text NOT NULL,
  disciplines_axis text NOT NULL,
  liturgy_axis text NOT NULL,
  nehemias_symbol text NOT NULL,
  nehemias_verse text NOT NULL,
  sort_order integer NOT NULL
);

-- 2. Integrantes de los 3 Comandos
CREATE TABLE IF NOT EXISTS public.camp_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  comando text NOT NULL CHECK (comando IN ('formacion', 'disciplinas', 'liturgia', 'coordinacion')),
  role text NOT NULL DEFAULT 'Integrante',
  email text,
  notify_daily boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_camp_members_comando
  ON public.camp_members (comando, role, name);

-- 3. Usuarios autenticados habilitados en el tablero
CREATE TABLE IF NOT EXISTS public.camp_authorized_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  comando text NOT NULL CHECK (comando IN ('formacion', 'disciplinas', 'liturgia', 'coordinacion')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 4. Tareas y actividades día por día
CREATE TABLE IF NOT EXISTS public.camp_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_id text NOT NULL REFERENCES public.camp_days(id) ON DELETE CASCADE,
  comando text NOT NULL CHECK (comando IN ('formacion', 'disciplinas', 'liturgia')),
  time_slot text NOT NULL CHECK (time_slot IN ('previo', 'manana', 'tarde', 'noche')),
  start_time text,
  title text NOT NULL,
  description text,
  assignee_id uuid REFERENCES public.camp_members(id) ON DELETE SET NULL,
  assignee_name text,
  status text NOT NULL DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'en_curso', 'bloqueado', 'listo')),
  priority text NOT NULL DEFAULT 'media' CHECK (priority IN ('alta', 'media', 'baja')),
  depends_on text,
  location text,
  materials text,
  doc_url text,
  notes text,
  sort_order integer NOT NULL DEFAULT 0,
  updated_by_email text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_camp_tasks_day_comando_slot
  ON public.camp_tasks (day_id, comando, time_slot, sort_order);

CREATE INDEX IF NOT EXISTS idx_camp_tasks_status
  ON public.camp_tasks (status);

CREATE INDEX IF NOT EXISTS idx_camp_tasks_assignee_id
  ON public.camp_tasks (assignee_id);

-- 5. Trigger seguro para updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_camp_tasks_updated_at ON public.camp_tasks;
CREATE TRIGGER trg_camp_tasks_updated_at
  BEFORE UPDATE ON public.camp_tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- 6. Seguridad: Habilitar RLS en todas las tablas expuestas
ALTER TABLE public.camp_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.camp_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.camp_authorized_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.camp_tasks ENABLE ROW LEVEL SECURITY;

-- Permisos explícitos de Data API únicamente para usuarios autenticados
REVOKE ALL ON public.camp_days, public.camp_members, public.camp_authorized_users, public.camp_tasks FROM anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.camp_days, public.camp_members, public.camp_authorized_users, public.camp_tasks TO authenticated;

-- Políticas de camp_authorized_users
DROP POLICY IF EXISTS "auth_select_authorized_users" ON public.camp_authorized_users;
CREATE POLICY "auth_select_authorized_users"
  ON public.camp_authorized_users FOR SELECT
  TO authenticated
  USING ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "auth_insert_own_authorized_user" ON public.camp_authorized_users;
CREATE POLICY "auth_insert_own_authorized_user"
  ON public.camp_authorized_users FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "auth_update_own_authorized_user" ON public.camp_authorized_users;
CREATE POLICY "auth_update_own_authorized_user"
  ON public.camp_authorized_users FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- Políticas colaborativas para miembros registrados de los 3 Comandos
DROP POLICY IF EXISTS "members_read_camp_days" ON public.camp_days;
CREATE POLICY "members_read_camp_days"
  ON public.camp_days FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.camp_authorized_users u WHERE u.user_id = (select auth.uid())));

DROP POLICY IF EXISTS "members_update_camp_days" ON public.camp_days;
CREATE POLICY "members_update_camp_days"
  ON public.camp_days FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.camp_authorized_users u WHERE u.user_id = (select auth.uid())))
  WITH CHECK (EXISTS (SELECT 1 FROM public.camp_authorized_users u WHERE u.user_id = (select auth.uid())));

DROP POLICY IF EXISTS "members_all_camp_members" ON public.camp_members;
CREATE POLICY "members_all_camp_members"
  ON public.camp_members FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.camp_authorized_users u WHERE u.user_id = (select auth.uid())))
  WITH CHECK (EXISTS (SELECT 1 FROM public.camp_authorized_users u WHERE u.user_id = (select auth.uid())));

DROP POLICY IF EXISTS "members_all_camp_tasks" ON public.camp_tasks;
CREATE POLICY "members_all_camp_tasks"
  ON public.camp_tasks FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.camp_authorized_users u WHERE u.user_id = (select auth.uid())))
  WITH CHECK (EXISTS (SELECT 1 FROM public.camp_authorized_users u WHERE u.user_id = (select auth.uid())));

-- 7. Resúmenes diarios de tareas pendientes cada 24 hs
CREATE TABLE IF NOT EXISTS public.camp_reminder_digests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id uuid NOT NULL REFERENCES public.camp_members(id) ON DELETE CASCADE,
  member_name text NOT NULL,
  member_role text NOT NULL,
  comando text NOT NULL,
  pending_count integer NOT NULL DEFAULT 0,
  headline text NOT NULL,
  tasks_snapshot jsonb NOT NULL DEFAULT '[]'::jsonb,
  channel text NOT NULL DEFAULT 'in_app',
  digest_date date NOT NULL DEFAULT ((now() AT TIME ZONE 'America/Argentina/Buenos_Aires')::date),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT uq_camp_reminder_member_date UNIQUE (member_id, digest_date)
);

CREATE INDEX IF NOT EXISTS idx_camp_reminder_digests_date
  ON public.camp_reminder_digests (digest_date DESC, member_id);

ALTER TABLE public.camp_reminder_digests ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.camp_reminder_digests FROM anon;
GRANT SELECT, INSERT, UPDATE ON public.camp_reminder_digests TO authenticated;

DROP POLICY IF EXISTS "members_all_camp_reminder_digests" ON public.camp_reminder_digests;
CREATE POLICY "members_all_camp_reminder_digests"
  ON public.camp_reminder_digests FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.camp_authorized_users u WHERE u.user_id = (select auth.uid())))
  WITH CHECK (EXISTS (SELECT 1 FROM public.camp_authorized_users u WHERE u.user_id = (select auth.uid())));

-- 8. Activar Realtime para edición en vivo entre los 3 Comandos
ALTER PUBLICATION supabase_realtime ADD TABLE public.camp_days, public.camp_members, public.camp_tasks, public.camp_reminder_digests;
