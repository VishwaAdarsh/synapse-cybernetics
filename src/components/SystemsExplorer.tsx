import React, { useState, useEffect, useRef } from 'react';
import { calculateSignalLatency, calculateBiocompatibilityScore } from '../utils/circuitry.ts';

interface CyberSystem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  channels: number;
  baseLatencyMs: number;
  tensileOrGrip: string;
  powerDrawMw: number;
  material: 'Titanium-Grade-5' | 'Silicon-Carbide' | 'Platinum-Iridium' | 'Polyimide' | 'Standard-Alloy';
  features: string[];
}

export const SystemsExplorer: React.FC = () => {
  const [selectedSystemId, setSelectedSystemId] = useState<string>('aura-hand');
  const [channelMultiplier, setChannelMultiplier] = useState<number>(256);
  const [distanceMm, setDistanceMm] = useState<number>(450);
  const [activeFinish, setActiveFinish] = useState<'DLC-Obsidian' | 'Grade-5-Titanium' | 'Bio-Gold'>('Grade-5-Titanium');
  const [waveformFrequency, setWaveformFrequency] = useState<number>(60); // Hz

  const waveformCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const systems: CyberSystem[] = [
    {
      id: 'aura-hand',
      name: 'Aura-VII Myoelectric Hand',
      tagline: '22-DoF Motor Articulation with Micro-Fluidic Sensory Feedback',
      category: 'Prosthetic Biomechatronics',
      description: 'Manufactured with selective laser-sintered Ti-6Al-4V titanium and silicone skin matrices. Translates patient intent into individual finger actuation with fine force discrimination down to 0.05 Newtons.',
      channels: 256,
      baseLatencyMs: 0.38,
      tensileOrGrip: '120 N Grip Force',
      powerDrawMw: 420,
      material: 'Titanium-Grade-5',
      features: [
        'Direct bone-anchored intramedullary osseointegration',
        'Sub-micron silicone elastomer sensory fingertip sensors',
        'Hermetically sealed titanium servo actuators',
        'Continuous neuromuscular pattern adaptation',
      ],
    },
    {
      id: 'cortex-bridge',
      name: 'Cortex-Link Sub-Cranial Bridge',
      tagline: '1,024-Channel Micro-Electrode Intracortical Interface',
      category: 'Neural Decoding Bridges',
      description: 'Flexible ultra-thin polyimide microelectrode threads implanted within the primary motor and somatosensory cortices. Monolithic ASIC performs real-time edge spike sorting without transcutaneous wiring.',
      channels: 1024,
      baseLatencyMs: 0.22,
      tensileOrGrip: '10.2 Gbps Throughput',
      powerDrawMw: 180,
      material: 'Platinum-Iridium',
      features: [
        'Polyimide thin-film threads with cellular pitch tolerance',
        'Near-field resonant transcutaneous power delivery',
        'On-implant neuromorphic spike sorting accelerator',
        'Zero-wire trans-cranial telemetry link',
      ],
    },
    {
      id: 'titan-spine',
      name: 'Titan-Core Biomechanical Spine',
      tagline: '5-Axis Thoracic & Lumbar Exoskeletal Reconstruction',
      category: 'Spinal Orthotics & Reconstruction',
      description: 'Engineered for complete spinal cord continuity restoration and high-load mechanical stabilization. Features conformal neural cuff arrays interfacing directly with bilateral spinal roots.',
      channels: 512,
      baseLatencyMs: 0.44,
      tensileOrGrip: '350 kg Dynamic Load',
      powerDrawMw: 650,
      material: 'Titanium-Grade-5',
      features: [
        'Multi-vertebral dynamic load sharing linkages',
        'Bilateral spinal root regenerative electrode cuffs',
        'Shock-absorbing viscoelastic intervertebral discs',
        'Self-calibrating postural stability sensors',
      ],
    },
    {
      id: 'optic-retina',
      name: 'Optic-X Sub-Retinal Array',
      tagline: '4,096-Pixel Photoreceptor Micro-Electrode Matrix',
      category: 'Sensory Neural Restoration',
      description: 'Ultra-high density photovoltaic array surgically positioned in the subretinal space, converting incoming ambient photons into discrete electrical pulses for bipolar and retinal ganglion cells.',
      channels: 4096,
      baseLatencyMs: 0.31,
      tensileOrGrip: '65° Visual Arc',
      powerDrawMw: 95,
      material: 'Silicon-Carbide',
      features: [
        'Diamond-like carbon (DLC) protective encapsulation',
        'Direct retinal ganglion pulse synchronization',
        '120 Hz optical stimulus refresh rate',
        'Infrared spectrum sensitivity expansion option',
      ],
    },
  ];

  const currentSystem = systems.find((s) => s.id === selectedSystemId) || systems[0];

  // Calculated dynamic metrics
  const calculatedLatency = calculateSignalLatency(channelMultiplier, distanceMm);
  const biocompatibility = calculateBiocompatibilityScore(currentSystem.material, 0.25, true);

  // Live neural waveform rendering
  useEffect(() => {
    const canvas = waveformCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const renderWave = () => {
      const w = (canvas.width = canvas.clientWidth);
      const h = (canvas.height = canvas.clientHeight);

      ctx.clearRect(0, 0, w, h);

      // Grid background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < w; x += 30) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += 20) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Center baseline
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      // Neural action potential waveform
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 1.8;
      ctx.beginPath();

      const midY = h / 2;
      for (let x = 0; x < w; x++) {
        const t = (x / w) * (waveformFrequency / 8) + phase;
        // Superimposed sinusoidal carrier with simulated neural spike bursts
        const carrier = Math.sin(t * 3.5) * 14;
        const spike = Math.pow(Math.sin(t * 1.5), 9) * 36;
        const noise = (Math.sin(x * 12.3) + Math.cos(x * 7.1)) * 1.5;

        const y = midY - (carrier + spike + noise);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Current pulse head indicator
      phase += 0.035;
      animId = requestAnimationFrame(renderWave);
    };

    renderWave();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [waveformFrequency]);

  return (
    <section id="systems" className="py-24 bg-[#090b10] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 mb-2 tracking-wider">
            01. CYBERNETIC HARDWARE ARCHITECTURES
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Proprietary Neural Interfaces & Prosthetic Systems
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            Every Synapse device bridges biological nerve fibers with silicon computation. Select a platform to inspect biomechanical tolerances, frequency responses, and telemetry specifications.
          </p>
        </div>

        {/* System Category Tabs - Functional Button Segmented Controls */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-[#0e111a] rounded-lg border border-white/[0.08] mb-8">
          {systems.map((sys) => (
            <button
              key={sys.id}
              onClick={() => {
                setSelectedSystemId(sys.id);
                setChannelMultiplier(sys.channels);
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                selectedSystemId === sys.id
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              {sys.name}
            </button>
          ))}
        </div>

        {/* Asymmetric Bento Layout: System Deep Dive & Live Signal Bench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Info Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-lg bg-[#0c0f17] border border-white/[0.08] p-6 space-y-6">
              <div>
                <div className="text-xs font-mono text-cyan-400 mb-1">{currentSystem.category}</div>
                <h3 className="text-2xl font-bold text-white">{currentSystem.name}</h3>
                <p className="text-sm font-medium text-slate-300 mt-1">{currentSystem.tagline}</p>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">{currentSystem.description}</p>

              {/* Technical Specifications Grid - Clean Unboxed Text with Tabular Numerals */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded bg-[#07080d] border border-white/[0.06]">
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Channels</div>
                  <div className="text-lg font-bold text-white tabular-nums">{currentSystem.channels}</div>
                  <div className="text-[10px] text-slate-400">Micro-electrodes</div>
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Base Latency</div>
                  <div className="text-lg font-bold text-cyan-300 tabular-nums">{currentSystem.baseLatencyMs} ms</div>
                  <div className="text-[10px] text-slate-400">Motor reflex delay</div>
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Key Spec</div>
                  <div className="text-lg font-bold text-white tabular-nums">{currentSystem.tensileOrGrip}</div>
                  <div className="text-[10px] text-slate-400">Physical capacity</div>
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Power Draw</div>
                  <div className="text-lg font-bold text-white tabular-nums">{currentSystem.powerDrawMw} mW</div>
                  <div className="text-[10px] text-slate-400">Active dissipation</div>
                </div>
              </div>

              {/* Architectural Feature Bullets */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
                  Engineered Subsystems
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {currentSystem.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 rounded bg-white/[0.02]">
                      <span className="text-cyan-400 mt-0.5">▪</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Parameter Tuning & Oscilloscope Waveform */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-lg bg-[#0c0f17] border border-cyan-500/20 p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Real-Time Neural Telemetry Bench
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">ASIC: SY-920</span>
              </div>

              {/* Oscilloscope Display */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                  <span>SIGNAL WAVEFORM (CH-14)</span>
                  <span className="text-cyan-400 tabular-nums">{waveformFrequency} Hz Sampling</span>
                </div>
                <div className="h-32 w-full rounded bg-[#05070a] border border-cyan-500/20 overflow-hidden">
                  <canvas ref={waveformCanvasRef} className="w-full h-full block" />
                </div>
              </div>

              {/* Interactive Controls */}
              <div className="space-y-4 text-xs font-mono text-slate-300">
                <div>
                  <div className="flex justify-between mb-1.5">
                    <label htmlFor="channel-density-slider" className="text-slate-400">CHANNEL DENSITY:</label>
                    <span className="text-white font-bold tabular-nums">{channelMultiplier} CH</span>
                  </div>
                  <input
                    id="channel-density-slider"
                    type="range"
                    min="32"
                    max="1024"
                    step="32"
                    value={channelMultiplier}
                    onChange={(e) => setChannelMultiplier(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-800 rounded h-1.5 cursor-pointer"
                    aria-label="Adjust Channel Density"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1.5">
                    <label htmlFor="conduction-distance-slider" className="text-slate-400">CONDUCTION DISTANCE (PERIPHERAL TO ASIC):</label>
                    <span className="text-white font-bold tabular-nums">{distanceMm} mm</span>
                  </div>
                  <input
                    id="conduction-distance-slider"
                    type="range"
                    min="100"
                    max="1200"
                    step="50"
                    value={distanceMm}
                    onChange={(e) => setDistanceMm(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-800 rounded h-1.5 cursor-pointer"
                    aria-label="Adjust Conduction Distance"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1.5">
                    <label htmlFor="sampling-frequency-slider" className="text-slate-400">SAMPLING CLOCK:</label>
                    <span className="text-white font-bold tabular-nums">{waveformFrequency} Hz</span>
                  </div>
                  <input
                    id="sampling-frequency-slider"
                    type="range"
                    min="20"
                    max="180"
                    step="10"
                    value={waveformFrequency}
                    onChange={(e) => setWaveformFrequency(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-800 rounded h-1.5 cursor-pointer"
                    aria-label="Adjust Sampling Clock Frequency"
                  />
                </div>

                {/* Surface Anodization Selection */}
                <div>
                  <div className="text-slate-400 mb-1.5">SURFACE BIOMATERIAL FINISH:</div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['DLC-Obsidian', 'Grade-5-Titanium', 'Bio-Gold'] as const).map((finish) => (
                      <button
                        key={finish}
                        onClick={() => setActiveFinish(finish)}
                        className={`py-1.5 px-2 rounded text-[10px] font-medium transition-colors text-center truncate ${
                          activeFinish === finish
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'bg-white/[0.04] text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {finish}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Calculation Output Strip */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-slate-400">ESTIMATED LATENCY: </span>
                  <span className="text-cyan-300 font-bold tabular-nums">{calculatedLatency} ms</span>
                </div>
                <div>
                  <span className="text-slate-400">BIOCOMPATIBILITY: </span>
                  <span className="text-emerald-400 font-bold tabular-nums">{biocompatibility.score}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
