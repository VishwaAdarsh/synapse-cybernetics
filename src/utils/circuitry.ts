/**
 * Pure logic and algorithms for procedural circuitry generation,
 * neural signal calculations, and form validation.
 */

export interface Point {
  x: number;
  y: number;
}

export interface CircuitTrace {
  id: string;
  points: Point[];
  viaStart: Point;
  viaEnd: Point;
  speed: number;
  pulseLength: number;
  pulseColor: string;
  strokeWidth: number;
}

export interface CircuitChip {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  pinCount: number;
}

export interface InquiryFormData {
  fullName: string;
  institution: string;
  workEmail: string;
  systemInterest: string;
  intendedApplication: string;
  ndaRequired: boolean;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof InquiryFormData, string>>;
}

/**
 * Validates a business/medical inquiry form
 */
export function validateInquiryForm(data: InquiryFormData): FormValidationResult {
  const errors: Partial<Record<keyof InquiryFormData, string>> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!data.institution || data.institution.trim().length < 2) {
    errors.institution = 'Please specify your institution or medical practice.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.workEmail || !emailRegex.test(data.workEmail.trim())) {
    errors.workEmail = 'Please provide a valid institutional email address.';
  }

  if (!data.systemInterest || data.systemInterest.trim() === '') {
    errors.systemInterest = 'Please select a cybernetic system of interest.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculates theoretical neuromuscular transmission latency in milliseconds
 */
export function calculateSignalLatency(
  channels: number,
  distanceMm: number,
  transmissionSpeedMps = 120 // standard myelinated axon conduction speed is ~100-120 m/s, silicon is near c/2
): number {
  if (channels <= 0 || distanceMm <= 0) return 0;
  // Electrical propagation across silicon bridge + biological synapse translation (fixed ~0.25ms synaptic delay)
  const physicalTransitSec = (distanceMm / 1000) / (transmissionSpeedMps * 1000);
  const physicalTransitMs = physicalTransitSec * 1000;
  const processingOverheadPerChannelMs = 0.005;
  const asicProcessingMs = Math.log2(channels) * processingOverheadPerChannelMs;
  const biologicalTransductionMs = 0.28;

  const totalMs = physicalTransitMs + asicProcessingMs + biologicalTransductionMs;
  return Number(totalMs.toFixed(3));
}

/**
 * Calculates biocompatibility index (0 to 100) based on materials and surface finish
 */
export function calculateBiocompatibilityScore(
  material: 'Titanium-Grade-5' | 'Silicon-Carbide' | 'Platinum-Iridium' | 'Polyimide' | 'Standard-Alloy',
  surfaceRoughnessRaUm: number,
  hermeticSeal: boolean
): { score: number; status: 'Optimal' | 'Clinical Standard' | 'Non-Compliant' } {
  let baseScore = 0;
  switch (material) {
    case 'Platinum-Iridium':
      baseScore = 99.4;
      break;
    case 'Titanium-Grade-5':
      baseScore = 98.8;
      break;
    case 'Silicon-Carbide':
      baseScore = 97.5;
      break;
    case 'Polyimide':
      baseScore = 95.2;
      break;
    default:
      baseScore = 72.0;
  }

  // Ra between 0.1 and 0.5 um is optimal for osseointegration and cellular adhesion
  let roughnessDelta = 0;
  if (surfaceRoughnessRaUm >= 0.1 && surfaceRoughnessRaUm <= 0.6) {
    roughnessDelta = 0.5;
  } else if (surfaceRoughnessRaUm > 1.5) {
    roughnessDelta = -8.0;
  }

  const sealBonus = hermeticSeal ? 0 : -25.0;
  const finalScore = Math.min(100, Math.max(0, Number((baseScore + roughnessDelta + sealBonus).toFixed(1))));

  let status: 'Optimal' | 'Clinical Standard' | 'Non-Compliant' = 'Clinical Standard';
  if (finalScore >= 98.0) {
    status = 'Optimal';
  } else if (finalScore < 90.0) {
    status = 'Non-Compliant';
  }

  return { score: finalScore, status };
}

/**
 * Generates an array of structured 45-degree angle PCB circuit traces
 */
export function generateDeterministicTraces(
  width: number,
  height: number,
  traceCount = 14
): CircuitTrace[] {
  const traces: CircuitTrace[] = [];
  const palette = ['#00f0ff', '#38bdf8', '#0ea5e9', '#06b6d4', '#67e8f9'];

  for (let i = 0; i < traceCount; i++) {
    const startX = ((i + 1) / (traceCount + 1)) * width;
    const startY = (i % 2 === 0) ? 0 : height;

    const bendX = startX + ((i % 3 === 0 ? 1 : -1) * (30 + (i * 8)));
    const bendY = startY + (startY === 0 ? 50 + (i * 15) : -(50 + (i * 15)));

    const horizontalTargetX = bendX + ((i % 2 === 0 ? 1 : -1) * (60 + (i * 12)));
    const endY = startY === 0 ? height * 0.45 + (i * 20) : height * 0.55 - (i * 20);

    const points: Point[] = [
      { x: startX, y: startY },
      { x: startX, y: bendY },
      { x: bendX, y: bendY },
      { x: horizontalTargetX, y: endY },
      { x: Math.max(20, Math.min(width - 20, horizontalTargetX + 40)), y: endY },
    ];

    traces.push({
      id: `trace-${i}`,
      points,
      viaStart: points[0],
      viaEnd: points[points.length - 1],
      speed: 0.003 + ((i % 5) * 0.0012),
      pulseLength: 0.15 + ((i % 4) * 0.05),
      pulseColor: palette[i % palette.length],
      strokeWidth: (i % 3 === 0) ? 1.5 : 1.0,
    });
  }

  return traces;
}
