import React, { useState } from 'react';
import { CircuitryCanvas } from './CircuitryCanvas.tsx';

export const CircuitDiagnostics: React.FC = () => {
  const [routingMode, setRoutingMode] = useState<'myoelectric' | 'bypass' | 'sensory'>('myoelectric');
  const [voltage, setVoltage] = useState<'1.2V' | '2.5V' | '3.3V'>('2.5V');
  const [pulseBursts, setPulseBursts] = useState<number>(0);
  const [impedanceBalance, setImpedanceBalance] = useState<number>(50); // Ohms
  const [lastEventLog, setLastEventLog] = useState<string>('System nominal. 256 neural channels calibrated.');

  const handleInjectPulse = () => {
    setPulseBursts((prev) => prev + 1);
    setLastEventLog(`Test pulse injected at ${new Date().toLocaleTimeString()} · Bus impedance: ${impedanceBalance}Ω`);
  };

  const modeDescriptions = {
    myoelectric: {
      title: 'Direct Myoelectric Bus (Mode A)',
      description: 'Synchronizes low-impedance motor unit action potentials (MUAP) directly to digital motor controllers with 0.38ms edge delay.',
      throughput: '4.8 Gbps',
      snr: '72.4 dB',
      jitter: '3.1 ps',
    },
    bypass: {
      title: 'Peripheral Nerve Bypass (Mode B)',
      description: 'Reroutes damaged motor axon signals across a synthetic biocompatible platinum bridge with active phase-locked impedance compensation.',
      throughput: '8.2 Gbps',
      snr: '68.9 dB',
      jitter: '4.8 ps',
    },
    sensory: {
      title: 'Bi-Directional Sensory Haptic Loop (Mode C)',
      description: 'Modulates prosthetic skin micro-pressure sensors into patterned electrical trains mimicking biological Merkel and Meissner corpuscles.',
      throughput: '2.4 Gbps',
      snr: '76.1 dB',
      jitter: '2.4 ps',
    },
  };

  const currentModeInfo = modeDescriptions[routingMode];

  return (
    <section id="diagnostics" className="py-24 bg-[#07080b] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 mb-2 tracking-wider">
            02. INTERACTIVE CIRCUIT DIAGNOSTICS & TELEMETRY
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            High-Speed Circuit Routing & Signal Integrity Suite
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            Test and simulate signal propagation across the Synapse hybrid flexible circuit substrate. Select routing modes, adjust trace impedance, and trigger pulse injections in real-time.
          </p>
        </div>

        {/* Diagnostic Testbench Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive Circuitry Visualizer */}
          <div className="lg:col-span-7 rounded-lg bg-[#0c0f17] border border-cyan-500/25 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 bg-[#0a0d14] border-b border-white/[0.08] text-xs font-mono">
              <span className="text-cyan-400 font-semibold">TESTBENCH: MULTI-LAYER FLEX PCB</span>
              <div className="flex items-center gap-3 text-slate-400">
                <span>VOLTAGE: <strong className="text-white">{voltage}</strong></span>
                <span>IMPEDANCE: <strong className="text-white">{impedanceBalance}Ω</strong></span>
              </div>
            </div>

            {/* Circuit Canvas Container */}
            <div className="relative h-80 sm:h-96 w-full bg-[#05070a]">
              <CircuitryCanvas
                intensity={routingMode === 'bypass' ? 1.5 : 1.0}
                speedMultiplier={routingMode === 'sensory' ? 1.2 : 0.9}
                colorScheme={routingMode === 'sensory' ? 'amber' : 'cyan'}
                interactive={true}
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#090b10]/90 border border-white/10 text-[11px] font-mono text-slate-300 pointer-events-none">
                CLICK CANVAS TO DISCHARGE PULSE WAVE
              </div>
            </div>

            {/* Telemetry Status Console */}
            <div className="p-3 bg-[#080a10] border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="truncate mr-4">
                <span className="text-cyan-400">LOG: </span>
                <span className="text-slate-300">{lastEventLog}</span>
              </div>
              <span className="tabular-nums text-slate-400 whitespace-nowrap">
                BURSTS: {pulseBursts}
              </span>
            </div>
          </div>

          {/* Right: Routing Controls & Signal Integrity KPIs */}
          <div className="lg:col-span-5 rounded-lg bg-[#0c0f17] border border-white/[0.08] p-6 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Signal Routing Configuration</h3>
              <p className="text-xs text-slate-400 mb-4">
                Choose the signal conduit protocol operating between the micro-electrode array and external biomechatronics.
              </p>

              {/* Routing Mode Buttons */}
              <div className="space-y-2 mb-6">
                {(['myoelectric', 'bypass', 'sensory'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setRoutingMode(m);
                      setLastEventLog(`Switched routing architecture to ${modeDescriptions[m].title}`);
                    }}
                    className={`w-full text-left p-3 rounded text-xs transition-all ${
                      routingMode === m
                        ? 'bg-cyan-950/60 border border-cyan-500/50 text-white'
                        : 'bg-white/[0.03] border border-white/[0.06] text-slate-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="font-semibold text-cyan-300">{modeDescriptions[m].title}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{modeDescriptions[m].description}</div>
                  </button>
                ))}
              </div>

              {/* Interactive Signal Control Knobs */}
              <div className="space-y-4 pt-4 border-t border-white/[0.08] text-xs font-mono text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">BUS OPERATING VOLTAGE:</span>
                  <div className="flex gap-1.5">
                    {(['1.2V', '2.5V', '3.3V'] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => {
                          setVoltage(v);
                          setLastEventLog(`Bus rail voltage set to ${v}`);
                        }}
                        className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                          voltage === v
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                            : 'bg-white/[0.04] text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1.5">
                    <label htmlFor="trace-impedance-slider" className="text-slate-400">TRACE IMPEDANCE BALANCING:</label>
                    <span className="text-white font-bold tabular-nums">{impedanceBalance} Ω</span>
                  </div>
                  <input
                    id="trace-impedance-slider"
                    type="range"
                    min="25"
                    max="100"
                    step="5"
                    value={impedanceBalance}
                    onChange={(e) => {
                      setImpedanceBalance(Number(e.target.value));
                      setLastEventLog(`Impedance tuned to ${e.target.value}Ω`);
                    }}
                    className="w-full accent-cyan-400 bg-slate-800 rounded h-1.5 cursor-pointer"
                    aria-label="Adjust Trace Impedance Balancing"
                  />
                </div>
              </div>
            </div>

            {/* Pulse Injection Trigger & Measured Signal Stats */}
            <div className="space-y-4 pt-4 border-t border-white/[0.08]">
              <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded bg-[#07080d] border border-white/[0.05]">
                  <div className="text-[10px] text-slate-400 uppercase">Throughput</div>
                  <div className="text-sm font-bold text-white tabular-nums">{currentModeInfo.throughput}</div>
                </div>
                <div className="p-2.5 rounded bg-[#07080d] border border-white/[0.05]">
                  <div className="text-[10px] text-slate-400 uppercase">SNR Ratio</div>
                  <div className="text-sm font-bold text-cyan-300 tabular-nums">{currentModeInfo.snr}</div>
                </div>
                <div className="p-2.5 rounded bg-[#07080d] border border-white/[0.05]">
                  <div className="text-[10px] text-slate-400 uppercase">Jitter</div>
                  <div className="text-sm font-bold text-white tabular-nums">{currentModeInfo.jitter}</div>
                </div>
              </div>

              <button
                onClick={handleInjectPulse}
                className="w-full py-2.5 text-xs font-mono font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 rounded transition-colors text-center"
                aria-label="Inject High-Frequency Test Pulse"
              >
                ⚡ Inject High-Frequency Test Pulse
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
