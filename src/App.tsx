/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { SystemsExplorer } from './components/SystemsExplorer.tsx';
import { CircuitDiagnostics } from './components/CircuitDiagnostics.tsx';
import { ArchitectureBlueprint } from './components/ArchitectureBlueprint.tsx';
import { ClinicalProof } from './components/ClinicalProof.tsx';
import { ConsultationModal } from './components/ConsultationModal.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const scrollToSystems = () => {
    const el = document.getElementById('systems');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080b] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar Contract Compliant Header */}
      <Navbar onRequestBriefing={() => setIsConsultationOpen(true)} />

      {/* Main Page Flow */}
      <main>
        {/* Hero Section with Live Animated Circuitry & Interactive Hotspots */}
        <HeroSection
          onRequestBriefing={() => setIsConsultationOpen(true)}
          onExploreSystems={scrollToSystems}
        />

        {/* 01. Cybernetic Hardware Architectures */}
        <SystemsExplorer />

        {/* 02. Interactive Circuit Diagnostics & Telemetry */}
        <CircuitDiagnostics />

        {/* 03. Cross-Sectional Hardware Stack */}
        <ArchitectureBlueprint />

        {/* 04. Clinical Evidence & Patient Outcomes */}
        <ClinicalProof />

        {/* Pre-Footer Action Decision Block */}
        <section className="py-20 bg-gradient-to-b from-[#07080b] to-[#040508] border-t border-white/[0.06] relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6 relative z-10">
            <div className="text-xs font-mono text-cyan-400 tracking-wider">
              CLINICAL DEPLOYMENT COHORTS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Initiate Institutional Partnership or Clinical Evaluation
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              We collaborate with premier neurosurgical units, orthopedic centers, and human-machine interface researchers worldwide. Request a confidential hardware specification packet and protocol review.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setIsConsultationOpen(true)}
                className="px-6 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 rounded transition-all whitespace-nowrap shadow-[0_0_20px_-3px_rgba(0,240,255,0.45)]"
              >
                Request Technical Briefing
              </button>
              <a
                href="#diagnostics"
                className="px-5 py-3 text-sm font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] rounded border border-white/10 transition-colors whitespace-nowrap"
              >
                Launch Circuit Diagnostics Testbench
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Interactive Consultation / Technical Briefing Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* Quiet Corporate Footer */}
      <Footer />
    </div>
  );
}
