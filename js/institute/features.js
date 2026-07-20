/* Institute feature flags — v2 labs parked off for MVP scope lock */

export const FEATURES = {
  httpLab: false, // v2 — simulated HTTP Lab
  typedCodeEditor: false, // v2 — desktop ≥900px typed editor + Parsons playground
};

export function isOn(key) {
  return !!FEATURES[key];
}
