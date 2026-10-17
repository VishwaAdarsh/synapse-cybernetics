import React, { useState } from 'react';
import { CircuitryCanvas } from './CircuitryCanvas.tsx';

interface HeroSectionProps {
  onRequestBriefing: () => void;
  onExploreSystems: () => void;
}

interface Hotspot {
  id: string;
  xPercent: number;
  yPercent: number;
  title: string;
  category: string;
  metric: string;
  detail: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRequestBriefing,
  onExploreSystems,
}) => {
  const [selectedHotspot, setSelectedHotspot] = useState<string>('sensor-array');
  const [circuitOverdrive, setCircuitOverdrive] = useState<boolean>(false);

  const hotspots: Hotspot[] = [
    {
      id: 'sensor-array',
      xPercent: 54,
      yPercent: 32,
      title: 'Neuromuscular Matrix',
      category: 'Sensory Transduction',
      metric: '256-Ch / 0.38ms Latency',
      detail: 'Ultra-low impedance platinum-iridium electrodes recording motor unit action potentials with sub-millisecond conversion.',
    },
    {
      id: 'titanium-shell',
      xPercent: 78,
      yPercent: 48,
      title: 'Grade 5 Ti Chassis',
      category: 'Structural Mechatronics',
      metric: '950 MPa Tensile Strength',
      detail: 'Laser powder-bed fusion titanium frame with multi-axis micro-harmonic drives delivering 120N grip force.',
    },
    {
      id: 'osseo-stem',
      xPercent: 24,
      yPercent: 68,
      title: 'Osseointegrated Anchor',
      category: 'Biocompatible Skeletal Link',
      metric: '0.02% Rejection Rate',
      detail: 'Porous hydroxyapatite-coated intramedullary stem directly bonded to skeletal bone, eliminating socket shear stress.',
    },
    {
      id: 'asic-core',
      xPercent: 42,
      yPercent: 58,
      title: 'Synapse-X Neuromorphic Core',
      category: 'Edge Neural Decoding',
      metric: '8.4 TOPS at 180mW',
      detail: 'Monolithic spike-timing silicon processor decoding intended finger kinematics using on-chip continuous neural calibration.',
    },
  ];

  const activeSpot = hotspots.find((h) => h.id === selectedHotspot) || hotspots[0];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-12 pb-20 border-b border-white/[0.06]">
      {/* Dynamic Animated Circuitry Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto opacity-70">
        <CircuitryCanvas
          intensity={circuitOverdrive ? 1.8 : 1.0}
          speedMultiplier={circuitOverdrive ? 1.6 : 1.0}
        />
        {/* Radial gradient vignette to maintain high text contrast */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,#07080b_85%] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {/* Editorial Domain Kicker - Clean unboxed text with typographic separators */}
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-4 tracking-wider">
          <span>MEDICAL-GRADE BIOMECHATRONICS</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>ISO 13485 CERTIFIED</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>FDA BREAKTHROUGH DESIGNATION</span>
        </div>

        {/* 2-Column Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] text-balance">
              Engineering the High-Bandwidth Interface Between{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-200">
                Flesh and Silicon
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Synapse Cybernetics develops clinical-grade neuromuscular prosthetics, sub-cranial micro-electrode arrays, and continuous sensory feedback bridges. Delivering biological response fidelity with sub-millisecond control latency.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onRequestBriefing}
                className="px-6 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 rounded transition-all whitespace-nowrap shadow-[0_0_20px_-3px_rgba(0,240,255,0.45)] hover:shadow-[0_0_25px_0px_rgba(0,240,255,0.6)]"
                aria-label="Request Technical Briefing"
              >
                Request Technical Briefing
              </button>

              <button
                onClick={onExploreSystems}
                className="px-5 py-3 text-sm font-medium text-slate-200 hover:text-white bg-[#0e111a] hover:bg-[#131724] rounded border border-white/15 hover:border-cyan-500/40 transition-colors whitespace-nowrap shadow-sm"
                aria-label="Explore Cyberware Specifications"
              >
                Explore Cyberware Specifications
              </button>

              <button
                onClick={() => setCircuitOverdrive((o) => !o)}
                className={`px-4 py-3 text-xs font-mono rounded border transition-colors whitespace-nowrap shadow-sm ${
                  circuitOverdrive
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-950/80 shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                    : 'border-white/15 text-slate-300 bg-[#0e111a] hover:text-cyan-400 hover:border-cyan-500/40'
                }`}
                aria-label={circuitOverdrive ? 'Deactivate Circuit Overdrive' : 'Activate Circuit Overdrive'}
              >
                {circuitOverdrive ? '⚡ Overdrive Active' : 'Overdrive Circuitry'}
              </button>
            </div>

            {/* Adjacent Trust Metric Strip - Clean unboxed text */}
            <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 font-mono">
              <div>
                <span className="text-white font-semibold tabular-nums">0.38 ms</span> Motor Latency
              </div>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <div>
                <span className="text-white font-semibold tabular-nums">1,024</span> Neural Channels
              </div>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <div>
                <span className="text-white font-semibold tabular-nums">99.98%</span> Biocompatibility
              </div>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <div>
                <span className="text-cyan-400 font-semibold tabular-nums">1,280+</span> Clinical Implants
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Bionic Interface Schematic */}
          <div className="lg:col-span-5">
            <div className="relative rounded-lg bg-[#0c0f17]/90 border border-cyan-500/25 p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] text-xs font-mono text-slate-400">
                <span className="text-cyan-400 font-semibold">MODEL: AURA-VII BIO-PROSTHETIC</span>
                <span className="text-slate-400">STATUS: ACTIVE LINK</span>
              </div>

              {/* Graphic Display with Interactive Hotspots */}
              <div className="relative my-4 aspect-[4/3] rounded bg-[#07090f] border border-white/[0.06] overflow-hidden flex items-center justify-center">
                {/* SVG Cyberware Anatomy Diagram */}
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full object-contain select-none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="50%" stopColor="#0f172a" />
                      <stop offset="100%" stopColor="#020617" />
                    </linearGradient>
                    <pattern id="microGrid" width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(0, 240, 255, 0.05)" strokeWidth="0.8" />
                    </pattern>
                  </defs>

                  <rect width="400" height="300" fill="url(#microGrid)" />

                  {/* Titanium Osseointegrated Stem */}
                  <path
                    d="M 60 170 L 120 170 L 140 150 L 160 150 L 160 190 L 140 190 L 120 170"
                    fill="#334155"
                    stroke="#00f0ff"
                    strokeWidth="1.2"
                  />
                  {/* Forearm Chassis */}
                  <path
                    d="M 140 130 L 230 120 L 270 140 L 270 200 L 220 215 L 140 195 Z"
                    fill="url(#cyberGrad)"
                    stroke="#475569"
                    strokeWidth="1.5"
                  />
                  {/* Articulated Bionic Hand & Phalanx Nodes */}
                  {/* Palm node */}
                  <circle cx="280" cy="165" r="14" fill="#0f172a" stroke="#00f0ff" strokeWidth="1.5" />
                  {/* Thumb */}
                  <path d="M 280 180 L 295 210 L 320 220" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Index */}
                  <path d="M 294 155 L 340 145 L 375 140" fill="none" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Middle */}
                  <path d="M 294 165 L 350 165 L 385 165" fill="none" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Ring */}
                  <path d="M 294 175 L 345 180 L 375 185" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Pinky */}
                  <path d="M 290 185 L 330 195 L 355 205" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Internal Optical Bus Lines */}
                  <path
                    d="M 150 165 L 190 165 L 210 150 L 250 150 L 280 165"
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                  <path
                    d="M 160 175 L 200 175 L 220 190 L 260 190 L 280 165"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />

                  {/* Micro-chip module */}
                  <rect x="195" y="152" width="28" height="24" fill="#020617" stroke="#00f0ff" strokeWidth="1.2" />
                  <text x="209" y="167" fill="#00f0ff" fontSize="7" fontFamily="monospace" textAnchor="middle">ASIC</text>
                </svg>

                {/* Hotspot Click Targets */}
                {hotspots.map((spot) => {
                  const isSelected = selectedHotspot === spot.id;
                  return (
                    <button
                      key={spot.id}
                      onClick={() => setSelectedHotspot(spot.id)}
                      style={{ left: `${spot.xPercent}%`, top: `${spot.yPercent}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all group ${
                        isSelected
                          ? 'bg-cyan-400 text-slate-950 scale-125 shadow-[0_0_15px_#00f0ff]'
                          : 'bg-slate-900/90 text-cyan-400 border border-cyan-500/50 hover:scale-110'
                      }`}
                      aria-label={`Inspect ${spot.title}`}
                      title={spot.title}
                    >
                      <span className="w-2 h-2 rounded-full bg-current" />
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Telemetry Panel for Selected Hotspot */}
              <div className="bg-[#07090f]/90 rounded border border-white/[0.08] p-3 text-xs space-y-1.5 transition-all">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-slate-400 font-medium">{activeSpot.category}</span>
                  <span className="text-cyan-300 font-mono font-semibold tabular-nums">
                    {activeSpot.metric}
                  </span>
                </div>
                <h2 className="text-sm font-semibold text-white">{activeSpot.title}</h2>
                <p className="text-slate-300 leading-normal">{activeSpot.detail}</p>
              </div>

              {/* Hotspot Selector Controls */}
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {hotspots.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setSelectedHotspot(h.id)}
                    className={`px-2 py-1.5 text-[11px] font-medium rounded transition-colors text-left truncate ${
                      selectedHotspot === h.id
                        ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/40'
                        : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
                    }`}
                  >
                    {h.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
