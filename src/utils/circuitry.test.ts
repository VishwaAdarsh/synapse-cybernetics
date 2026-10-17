import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateInquiryForm,
  calculateSignalLatency,
  calculateBiocompatibilityScore,
  generateDeterministicTraces,
} from './circuitry.ts';

test('validateInquiryForm checks required fields', () => {
  const invalid = validateInquiryForm({
    fullName: '',
    institution: '',
    workEmail: 'invalid-email',
    systemInterest: '',
    intendedApplication: '',
    ndaRequired: false,
  });

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.institution);
  assert.ok(invalid.errors.workEmail);
  assert.ok(invalid.errors.systemInterest);

  const valid = validateInquiryForm({
    fullName: 'Dr. Elena Rostova',
    institution: 'Zurich Neural Robotics Institute',
    workEmail: 'rostova@znri.ch',
    systemInterest: 'aura-vii-hand',
    intendedApplication: 'Clinical prosthetic trials',
    ndaRequired: true,
  });

  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('calculateSignalLatency calculates physiologically plausible latency', () => {
  const latency = calculateSignalLatency(64, 450);
  assert.ok(latency > 0.25, 'Latency should account for biological synaptic delay');
  assert.ok(latency < 0.60, 'Sub-millisecond latency expected for titanium-neural bridge');

  // Channel increase should slightly increment digital ASIC demux overhead
  const latencyLowChannels = calculateSignalLatency(8, 450);
  const latencyHighChannels = calculateSignalLatency(1024, 450);
  assert.ok(latencyHighChannels > latencyLowChannels);
});

test('calculateBiocompatibilityScore grades medical implant materials accurately', () => {
  const tiResult = calculateBiocompatibilityScore('Titanium-Grade-5', 0.3, true);
  assert.equal(tiResult.status, 'Optimal');
  assert.ok(tiResult.score >= 98);

  const nonHermetic = calculateBiocompatibilityScore('Standard-Alloy', 2.0, false);
  assert.equal(nonHermetic.status, 'Non-Compliant');
  assert.ok(nonHermetic.score < 80);
});

test('generateDeterministicTraces produces valid routing coordinates', () => {
  const traces = generateDeterministicTraces(1200, 800, 10);
  assert.equal(traces.length, 10);

  for (const trace of traces) {
    assert.ok(trace.points.length >= 4);
    assert.ok(trace.speed > 0);
    assert.ok(trace.pulseLength > 0);
    assert.ok(trace.pulseColor.startsWith('#'));
  }
});
