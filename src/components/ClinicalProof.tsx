import React from 'react';

export const ClinicalProof: React.FC = () => {
  const caseStudies = [
    {
      patientId: 'Study Cohort #04 - Bilateral Transradial Amputation',
      institution: 'Charité Universitätsmedizin Berlin',
      timeline: '36-Month Longitudinal Trial (2023–2026)',
      outcome: 'Full closed-loop motor and haptic sensory restoration',
      quote:
        'With the Aura-VII osseointegrated interface, I regained the ability to feel texture gradations and manipulate fragile glassware without visual monitoring. The reflex latency is indistinguishable from my biological hand.',
      metrics: [
        { label: 'Dexterity Score (ARAT)', value: '54 / 57 pts', delta: '+38 pts vs baseline' },
        { label: 'Grip Force Reflex Delay', value: '0.38 ms', delta: 'Biological equivalence' },
        { label: 'Neural Signal Retention', value: '99.4%', delta: 'Zero electrode drift' },
      ],
    },
    {
      patientId: 'Study Cohort #09 - High Cervical Spinal Cord Injury (C5/C6)',
      institution: 'Swiss Federal Institute of Technology Lausanne (EPFL)',
      timeline: '24-Month Clinical Feasibility Study',
      outcome: 'Sub-cranial cortical decoding for high-speed digital actuation',
      quote:
        'The 1,024-channel microelectrode array decodes continuous motor intent with near-zero calibration drift. Our trial participant achieved 84 words per minute neural text generation and robotic limb spatial teleoperation.',
      metrics: [
        { label: 'Motor Typing Speed', value: '84 WPM', delta: 'World record for BCI' },
        { label: 'Spike Sorting Accuracy', value: '98.8%', delta: 'On-chip ASIC inference' },
        { label: 'Infection / Rejection Rate', value: '0.00%', delta: '3-year zero adverse event' },
      ],
    },
  ];

  return (
    <section id="clinical" className="py-24 bg-[#07080b] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 mb-2 tracking-wider">
            04. CLINICAL EVIDENCE & PATIENT OUTCOMES
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Longitudinal Human Trials & Biometric Rigor
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            Synapse Cybernetics partners with premier neurosurgical hospitals and rehabilitation institutes globally. All systems undergo multi-year longitudinal verification with zero compromise on patient safety.
          </p>
        </div>

        {/* Aggregate Clinical Metrics Strip - Clean unboxed text with tabular numerals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-lg bg-[#0c0f17] border border-white/[0.08] mb-12">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums font-mono">1,280+</div>
            <div className="text-xs text-slate-300 font-medium mt-1">Surgical Implants Deployed</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Across 18 medical centers</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 tabular-nums font-mono">0.02%</div>
            <div className="text-xs text-slate-300 font-medium mt-1">Immune Rejection Rate</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Over 5 years follow-up</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums font-mono">99.4%</div>
            <div className="text-xs text-slate-300 font-medium mt-1">Signal Retention at 36 Mos</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Stable electrode impedance</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 tabular-nums font-mono">0.38 ms</div>
            <div className="text-xs text-slate-300 font-medium mt-1">Mean Synaptic Latency</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Exceeds biological reflex speeds</div>
          </div>
        </div>

        {/* Detailed Case Studies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((study, idx) => (
            <div
              key={idx}
              className="rounded-lg bg-[#0c0f17] border border-white/[0.08] p-6 space-y-6 flex flex-col justify-between"
            >
              <div>
                {/* Unboxed Metadata with Typographic Separators */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                  <span>{study.institution}</span>
                  <span aria-hidden="true">·</span>
                  <span>{study.timeline}</span>
                </div>

                <h3 className="text-lg font-bold text-white">{study.patientId}</h3>
                <div className="text-xs text-cyan-300 font-mono mt-1">{study.outcome}</div>

                <blockquote className="mt-4 text-sm text-slate-300 italic border-l-0 pl-0 leading-relaxed bg-[#08090f] p-4 rounded border border-white/[0.04]">
                  "{study.quote}"
                </blockquote>
              </div>

              {/* Quantified Outcome Metrics */}
              <div className="pt-4 border-t border-white/[0.08] space-y-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Verified Clinical Endpoints
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  {study.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-2 rounded bg-white/[0.02]">
                      <div className="text-[10px] text-slate-400 truncate">{m.label}</div>
                      <div className="text-sm font-bold text-white tabular-nums mt-0.5">{m.value}</div>
                      <div className="text-[10px] text-cyan-400/80 truncate mt-0.5">{m.delta}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
