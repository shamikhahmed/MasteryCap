/* Institute feature flags — v50 unlock: HTTP Lab + typed editor on */

export const FEATURES = {
  httpLab: true, // simulated HTTP Lab
  typedCodeEditor: true, // desktop ≥900px typed editor + Parsons playground
};

export function isOn(key) {
  return !!FEATURES[key];
}
