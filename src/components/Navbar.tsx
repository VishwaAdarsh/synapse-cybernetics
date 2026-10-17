import React, { useState } from 'react';

interface NavbarProps {
  onRequestBriefing: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestBriefing }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Neural Systems', href: '#systems' },
    { label: 'Bionic Prosthetics', href: '#prosthetics' },
    { label: 'Bioware Architecture', href: '#architecture' },
    { label: 'Circuit Diagnostics', href: '#diagnostics' },
    { label: 'Clinical Data', href: '#clinical' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#07080b]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 group"
          aria-label="Synapse Cybernetics Home"
        >
          <span className="text-white">SYNAPSE</span>
          <span className="text-cyan-400 font-semibold tracking-wider text-xs px-1.5 py-0.5 rounded border border-cyan-500/30 bg-cyan-950/40">
            CYBERNETICS
          </span>
        </a>

        {/* Zone 2: 4-5 concise single-line text links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 text-slate-300 relative py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onRequestBriefing}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 rounded transition-colors whitespace-nowrap shrink-0 shadow-[0_0_15px_-3px_rgba(0,240,255,0.4)]"
            aria-label="Request Technical Briefing"
          >
            Request Technical Briefing
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded border border-white/10"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#090b10] px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-sm text-slate-300 hover:text-cyan-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/[0.06]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestBriefing();
              }}
              className="w-full py-2.5 text-center text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors"
            >
              Request Technical Briefing
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
