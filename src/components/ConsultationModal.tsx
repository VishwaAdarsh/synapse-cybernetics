import React, { useState } from 'react';
import { validateInquiryForm, InquiryFormData } from '../utils/circuitry.ts';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    institution: '',
    workEmail: '',
    systemInterest: 'Aura-VII Myoelectric Hand',
    intendedApplication: '',
    ndaRequired: true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateInquiryForm(formData);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    const refCode = `SYN-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceId(refCode);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      institution: '',
      workEmail: '',
      systemInterest: 'Aura-VII Myoelectric Hand',
      intendedApplication: '',
      ndaRequired: true,
    });
    setErrors({});
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="briefing-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-lg rounded-lg bg-[#0c0f17] border border-cyan-500/30 p-6 shadow-2xl overflow-hidden">
        {/* Subtle circuitry trace accents */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-200" />

        {isSubmitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-cyan-950/80 border border-cyan-400 flex items-center justify-center text-cyan-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="text-xs font-mono text-cyan-400 tracking-wider">
              BRIEFING REQUEST CONFIRMED
            </div>

            <h3 id="briefing-dialog-title" className="text-xl font-bold text-white">
              Technical Dossier Dispatched
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
              Thank you, <strong className="text-white">{formData.fullName}</strong>. A technical package for the{' '}
              <strong className="text-cyan-300">{formData.systemInterest}</strong> has been routed to{' '}
              <span className="text-slate-200 font-mono">{formData.workEmail}</span>. Our clinical engineering liaison will contact your practice within 24 hours.
            </p>

            <div className="p-3 bg-[#07080d] rounded border border-white/[0.08] text-xs font-mono text-slate-400 inline-block">
              INQUIRY REFERENCE: <span className="text-cyan-400 font-bold">{referenceId}</span>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="w-full py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors whitespace-nowrap"
              >
                Close Confirmation
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div>
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                  CLINICAL PARTNERSHIP & RESEARCH
                </div>
                <h3 id="briefing-dialog-title" className="text-lg font-bold text-white">
                  Request Technical Briefing & Schematics
                </h3>
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 text-sm font-mono"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1" htmlFor="fullName">
                  Full Name & Credentials *
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="e.g. Dr. Jennifer Vance, MD / Lead Roboticist"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#07090e] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                {errors.fullName && <p className="mt-1 text-rose-400 text-[11px]">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1" htmlFor="institution">
                    Institution / Hospital *
                  </label>
                  <input
                    id="institution"
                    type="text"
                    placeholder="e.g. Johns Hopkins Medical"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#07090e] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  {errors.institution && <p className="mt-1 text-rose-400 text-[11px]">{errors.institution}</p>}
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1" htmlFor="workEmail">
                    Institutional Email *
                  </label>
                  <input
                    id="workEmail"
                    type="email"
                    placeholder="doctor@hospital.org"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#07090e] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  {errors.workEmail && <p className="mt-1 text-rose-400 text-[11px]">{errors.workEmail}</p>}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1" htmlFor="systemInterest">
                  Cybernetic Platform of Interest
                </label>
                <select
                  id="systemInterest"
                  value={formData.systemInterest}
                  onChange={(e) => setFormData({ ...formData, systemInterest: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#07090e] border border-white/10 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <option value="Aura-VII Myoelectric Hand">Aura-VII Myoelectric Hand (22-DoF)</option>
                  <option value="Cortex-Link Sub-Cranial Bridge">Cortex-Link Sub-Cranial Bridge (1024-Ch)</option>
                  <option value="Titan-Core Biomechanical Spine">Titan-Core Biomechanical Spine</option>
                  <option value="Optic-X Sub-Retinal Array">Optic-X Sub-Retinal Array (4K Photoreceptors)</option>
                  <option value="Custom ASIC / Flexible PCB Substrate">Custom ASIC / Flexible PCB Substrate</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1" htmlFor="intendedApplication">
                  Intended Research / Clinical Scope
                </label>
                <textarea
                  id="intendedApplication"
                  rows={2}
                  placeholder="Describe your patient trial criteria, limb configuration, or biomechanical requirements..."
                  value={formData.intendedApplication}
                  onChange={(e) => setFormData({ ...formData, intendedApplication: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#07090e] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  id="ndaRequired"
                  type="checkbox"
                  checked={formData.ndaRequired}
                  onChange={(e) => setFormData({ ...formData, ndaRequired: e.target.checked })}
                  className="w-3.5 h-3.5 rounded bg-slate-900 border-white/20 text-cyan-400 focus:ring-0"
                />
                <label htmlFor="ndaRequired" className="text-[11px] text-slate-400 cursor-pointer">
                  Execute mutual Non-Disclosure Agreement (NDA) prior to schematics disclosure
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 rounded transition-colors whitespace-nowrap shadow-[0_0_15px_-2px_rgba(0,240,255,0.4)]"
                >
                  Submit Engineering Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
