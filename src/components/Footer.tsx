import React from 'react';
import { CAMPAMENTO_CONFIG } from '../data/campamentoData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-pbc-deep border-t border-pbc/20 text-gray-400 py-12">
      <div className="max-w-md mx-auto px-4 flex flex-col gap-6 text-center">
        <div className="flex flex-col items-center gap-3">
          {/* Logo Oficial en Alta Resolución */}
          <div className="w-14 h-14 flex-shrink-0">
            <img 
              src="/assets/logo-oficial.png" 
              alt="Logo Protagonistas del Bien Común 2027" 
              className="w-full h-full object-contain filter drop-shadow-[0_0_16px_rgba(100,213,171,0.5)]"
            />
          </div>

          <div>
            <h3 className="font-coolvetica text-lg text-white uppercase tracking-wider">
              Protagonistas del BIEN COMÚN
            </h3>
            <p className="text-xs font-sans text-gray-400 max-w-xs mx-auto text-pretty mt-1">
              Campamento Nacional de Milicianos Universitarios. FASTA Argentina · Mendoza, {CAMPAMENTO_CONFIG.fechas}.
            </p>
          </div>

          <span className="font-mono text-[10px] text-pbc font-bold uppercase tracking-widest mt-1">
            «{CAMPAMENTO_CONFIG.lema.toUpperCase()}»
          </span>
        </div>

        {/* Contacto Guardia Mendoza */}
        <div className="flex flex-col items-center gap-1 font-mono text-[11px] text-gray-400">
          <span className="font-coolvetica text-xs text-white uppercase mb-0.5">
            Guardia Mendoza
          </span>
          <a href={`tel:${CAMPAMENTO_CONFIG.contactoWhatsApp}`} className="hover:text-pbc transition-colors">
            {CAMPAMENTO_CONFIG.contactoWhatsApp}
          </a>
          <a href={`mailto:${CAMPAMENTO_CONFIG.contactoEmail}`} className="text-pbc hover:underline">
            {CAMPAMENTO_CONFIG.contactoEmail}
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-white/10 flex flex-col gap-1 text-[10px] font-mono text-gray-500">
          <p>© 2027 FASTA · Movimiento de Milicianos.</p>
          <p className="text-pbc">Mendoza · {CAMPAMENTO_CONFIG.fechas}</p>
        </div>
      </div>
    </footer>
  );
};
