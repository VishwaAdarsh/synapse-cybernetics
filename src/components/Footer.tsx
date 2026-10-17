import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050609] border-t border-white/[0.08] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white tracking-tight">SYNAPSE</span>
              <span className="text-cyan-400 font-semibold tracking-wider text-[11px] px-1.5 py-0.5 rounded border border-cyan-500/30 bg-cyan-950/40">
                CYBERNETICS
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Engineering biocompatible silicon-neural architectures, high-DoF osseointegrated prosthetics, and neuromorphic edge processors for human functional augmentation.
            </p>
            <div className="text-[11px] font-mono text-slate-500">
              ISO 13485:2016 Certified Medical Device Manufacturer · Zurich · Boston · Tokyo
            </div>
          </div>

          {/* Nav Categories */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
            <div>
              <div className="font-semibold text-white uppercase tracking-wider font-mono text-[11px] mb-3">
                Platforms
              </div>
              <ul className="space-y-2">
                <li><a href="#systems" className="hover:text-cyan-400 transition-colors">Aura-VII Bionic Hand</a></li>
                <li><a href="#systems" className="hover:text-cyan-400 transition-colors">Cortex-Link Array</a></li>
                <li><a href="#systems" className="hover:text-cyan-400 transition-colors">Titan-Core Bio-Spine</a></li>
                <li><a href="#systems" className="hover:text-cyan-400 transition-colors">Optic-X Retina Interface</a></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-white uppercase tracking-wider font-mono text-[11px] mb-3">
                Engineering
              </div>
              <ul className="space-y-2">
                <li><a href="#architecture" className="hover:text-cyan-400 transition-colors">Micro-Via Flex PCB</a></li>
                <li><a href="#diagnostics" className="hover:text-cyan-400 transition-colors">Circuit Diagnostics</a></li>
                <li><a href="#architecture" className="hover:text-cyan-400 transition-colors">Neuromorphic ASIC</a></li>
                <li><a href="#clinical" className="hover:text-cyan-400 transition-colors">Clinical Benchmarks</a></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-white uppercase tracking-wider font-mono text-[11px] mb-3">
                Regulatory
              </div>
              <ul className="space-y-2">
                <li><span className="text-slate-400">FDA IDE Approval</span></li>
                <li><span className="text-slate-400">MDR CE Mark Class III</span></li>
                <li><span className="text-slate-400">Good Clinical Practice (GCP)</span></li>
                <li><span className="text-slate-400">Institutional Review Boards</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer & Copyright Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} Synapse Cybernetics AG. All rights reserved. Investigational medical devices limited by federal law to investigational use.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Whitepaper</span>
            <span className="hover:text-slate-400 cursor-pointer">Clinical Ethics Code</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
