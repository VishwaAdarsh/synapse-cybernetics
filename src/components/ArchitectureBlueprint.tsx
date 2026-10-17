import React, { useState } from 'react';

interface BlueprintLayer {
  id: string;
  number: string;
  name: string;
  material: string;
  thickness: string;
  functionality: string;
  specs: { label: string; value: string }[];
}

export const ArchitectureBlueprint: React.FC = () => {
  const [activeLayerId, setActiveLayerId] = useState<string>('layer-polyimide');

  const layers: BlueprintLayer[] = [
    {
      id: 'layer-dlc',
      number: '01',
      name: 'Diamond-Like Carbon (DLC) Hermetic Casing',
      material: 'sp3-bonded Amorphous Carbon & Ti-6Al-4V Alloy',
      thickness: '0.45 mm',
      functionality: 'Biocompatible hermetic seal preventing any ionic fluid ingress and cellular immune response.',
      specs: [
        { label: 'Hermetic Leak Rate', value: '< 1 × 10⁻¹¹ atm·cc/sec' },
        { label: 'Hardness Rating', value: '42 GPa Vickers' },
        { label: 'Surface Friction', value: '0.04 μ' },
        { label: 'Cell Adhesion', value: 'Non-immunogenic' },
      ],
    },
    {
      id: 'layer-polyimide',
      number: '02',
      name: '16-Layer High-Density Flexible Polyimide PCB',
      material: 'Ultra-thin Polyimide Substrate with ENIG Gold Finish',
      thickness: '0.18 mm',
      functionality: 'Routes 1,024 microscopic differential signal traces at 25-micron pitch with controlled 50Ω impedance.',
      specs: [
        { label: 'Layer Count', value: '16 Micro-Via Layers' },
        { label: 'Trace / Space Pitch', value: '25 μm / 25 μm' },
        { label: 'Dielectric Constant (Dk)', value: '3.2 at 10 GHz' },
        { label: 'Flex Cycle Endurance', value: '> 10,000,000 Cycles' },
      ],
    },
    {
      id: 'layer-asic',
      number: '03',
      name: 'Synapse-X Neuromorphic ASIC Co-Processor',
      material: 'Monolithic Silicon-on-Insulator (FD-SOI) at 12nm',
      thickness: '0.12 mm (Thinned)',
      functionality: 'On-chip analog front-end for neural spike amplification, bandpass filtering, and spike-timing classification.',
      specs: [
        { label: 'Neural Channels', value: '1,024 Simultaneous' },
        { label: 'Input Referred Noise', value: '1.8 μVrms' },
        { label: 'Power Consumption', value: '180 mW Nominal' },
        { label: 'Compute Engine', value: '8.4 TOPS Spike-NN' },
      ],
    },
    {
      id: 'layer-power',
      number: '04',
      name: 'Transcutaneous Resonant Inductive Power Subsystem',
      material: 'Litz Wire Ferrite Core with Medical PEEK Encapsulation',
      thickness: '0.65 mm',
      functionality: 'Charges the implant wirelessly through intact tissue at 13.56 MHz with zero thermal elevation of surrounding tissue.',
      specs: [
        { label: 'Resonant Frequency', value: '13.56 MHz ISM' },
        { label: 'Tissue Thermal Rise', value: '< 0.3°C at Peak Charge' },
        { label: 'Battery Chemistry', value: 'Solid-State Ceramic Li-PON' },
        { label: 'Cycle Longevity', value: '5,000 Full Cycles' },
      ],
    },
  ];

  const currentLayer = layers.find((l) => l.id === activeLayerId) || layers[1];

  return (
    <section id="architecture" className="py-24 bg-[#090b10] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono text-cyan-400 mb-2 tracking-wider">
            03. CROSS-SECTIONAL HARDWARE STACK
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Exploded Micro-Architecture Blueprint
          </h2>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            Every millimeter of Synapse hardware represents precision miniaturization. Explore each layer of the hermetic neural stack to understand its physical, electrical, and biological safeguards.
          </p>
        </div>

        {/* 2-Column Blueprint & Schematic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Exploded Stack Visualizer */}
          <div className="lg:col-span-6 rounded-lg bg-[#0c0f17] border border-white/[0.08] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                <span className="text-cyan-400">HERMETIC ENCLOSURE STACK</span>
                <span>Z-AXIS CROSS SECTION</span>
              </div>

              {/* Stack Layers Visualizer */}
              <div className="space-y-3 my-6">
                {layers.map((layer) => {
                  const isActive = activeLayerId === layer.id;
                  return (
                    <div
                      key={layer.id}
                      onClick={() => setActiveLayerId(layer.id)}
                      className={`p-4 rounded border transition-all cursor-pointer relative overflow-hidden ${
                        isActive
                          ? 'bg-[#121724] border-cyan-400 shadow-[0_0_20px_-5px_rgba(0,240,255,0.3)]'
                          : 'bg-[#080a10] border-white/[0.07] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-cyan-400">{layer.number}</span>
                          <span className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                            {layer.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-slate-400 tabular-nums">{layer.thickness}</span>
                      </div>

                      {/* Subtle circuit line indicator for active layer */}
                      {isActive && (
                        <div className="mt-2.5 pt-2 border-t border-cyan-500/20 text-xs text-cyan-300 font-mono flex items-center justify-between">
                          <span>{layer.material}</span>
                          <span>ACTIVE FOCUS</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-xs text-slate-400 font-mono flex items-center gap-2 pt-4 border-t border-white/[0.08]">
              <span className="text-cyan-400">ISO 10993:</span>
              <span>All blood and tissue-contacting layers biologically evaluated for sub-chronic systemic toxicity.</span>
            </div>
          </div>

          {/* Right Column: Layer Specifics & Technical Datasheet */}
          <div className="lg:col-span-6 rounded-lg bg-[#0c0f17] border border-cyan-500/20 p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <div className="text-xs font-mono text-cyan-400 mb-1">
                  LAYER SPECIFICATION {currentLayer.number} / 04
                </div>
                <h3 className="text-xl font-bold text-white">{currentLayer.name}</h3>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  MATERIAL: <span className="text-slate-200">{currentLayer.material}</span>
                </div>
              </div>

              <div className="p-4 rounded bg-[#07080d] border border-white/[0.06] text-xs text-slate-300 leading-relaxed">
                <div className="text-slate-400 font-mono uppercase text-[10px] mb-1">Functional Mandate</div>
                {currentLayer.functionality}
              </div>

              {/* Technical Specifications */}
              <div>
                <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  Verified Engineering Benchmarks
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  {currentLayer.specs.map((s, idx) => (
                    <div key={idx} className="p-3 rounded bg-white/[0.02] border border-white/[0.05]">
                      <div className="text-slate-400 text-[10px] uppercase">{s.label}</div>
                      <div className="text-white font-bold text-sm mt-0.5 tabular-nums text-cyan-200">
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
              <span>THERMAL FLUX: 12 mW/cm²</span>
              <span className="text-cyan-400 font-semibold">100% REVERSIBLE IMPLANTATION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
