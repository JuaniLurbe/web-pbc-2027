import React from 'react';
import { Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0A0E0D]/95 backdrop-blur-md border-b border-[#64D5AB]/20 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between gap-2">
        
        {/* Logo Oficial Compartido por el Usuario */}
        <a 
          href="#hero" 
          className="flex items-center gap-1.5 group active:scale-95 transition-transform duration-150 py-1 min-w-0"
        >
          <img 
            src="/assets/logo-oficial.png" 
            alt="Logo Oficial Protagonistas del Bien Común" 
            className="h-11 w-auto max-w-[170px] object-contain drop-shadow-[0_0_12px_rgba(100,213,171,0.35)]"
          />
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-pbc/20 text-pbc font-extrabold border border-pbc/40 self-center">
            2027
          </span>
        </a>

        {/* Botón CTA Header */}
        <div className="flex items-center">
          <a 
            href="#llamado-final"
            className="min-h-[42px] px-4 rounded-xl bg-pbc text-pbc-deep font-sans font-black text-[12px] uppercase tracking-wider transition-all duration-200 shadow-[0_0_18px_rgba(100,213,171,0.45)] active:scale-95 flex items-center gap-1.5 hover:bg-pbc-light cursor-pointer"
          >
            <span>SUMARME</span>
            <Zap className="w-3.5 h-3.5 fill-current" />
          </a>
        </div>

      </div>
    </header>
  );
};
