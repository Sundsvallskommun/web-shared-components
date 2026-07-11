import { toRGB } from '@sk-web-gui/utils';

/**
 * A 50–900 colour ramp plus `lightest` / `darkest` end-stops. Values are `rgb(r,g,b)`
 * strings so they slot directly into the same format as the curated primitives in
 * {@link ./colors}.
 */
export interface ColorRamp {
  lightest: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  darkest: string;
}

const formatRgb = ([r, g, b]: [number, number, number]): string => `rgb(${r},${g},${b})`;

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
    else if (max === gn) h = ((bn - rn) / d + 2) * 60;
    else h = ((rn - gn) / d + 4) * 60;
  }
  return [h, s * 100, l * 100];
};

const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = ((h % 360) + 360) % 360;
  const x = c * (1 - Math.abs(((hp / 60) % 2) - 1));
  const m = l - c / 2;
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;
  if (hp < 60) [r1, g1, b1] = [c, x, 0];
  else if (hp < 120) [r1, g1, b1] = [x, c, 0];
  else if (hp < 180) [r1, g1, b1] = [0, c, x];
  else if (hp < 240) [r1, g1, b1] = [0, x, c];
  else if (hp < 300) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];
  return [Math.round((r1 + m) * 255), Math.round((g1 + m) * 255), Math.round((b1 + m) * 255)];
};

// Target lightness per ramp step, calibrated against the existing Sundsvall blue ramp
// (50: 96, 100: 93, 200: 87, 300: 78, 400: 62, 500: 50, 600: 38, 700: anchor, 800: anchor-3,
// 900: anchor-7). The input hex anchors the 700 step (its main brand-colour position); the
// lighter and darker steps are interpolated in HSL so the family stays recognisable.
const lightnessTargets: Array<[keyof ColorRamp, number | 'anchor' | 'anchor-3' | 'anchor-7' | 'anchor-12']> = [
  ['lightest', 100],
  [50, 96],
  [100, 93],
  [200, 87],
  [300, 78],
  [400, 62],
  [500, 50],
  [600, 38],
  [700, 'anchor'],
  [800, 'anchor-3'],
  [900, 'anchor-7'],
  ['darkest', 'anchor-12'],
];

// Light steps drop saturation a touch so they read as soft tints rather than pastel-neon;
// dark steps keep full saturation. Calibrated by eye against the existing primitives.
const saturationScale: Partial<Record<keyof ColorRamp, number>> = {
  lightest: 0,
  50: 0.55,
  100: 0.65,
  200: 0.75,
  300: 0.85,
  400: 0.95,
};

/**
 * Generate a 50–900 colour ramp (plus `lightest` / `darkest`) from a single hex value.
 * The input anchors the `700` step — i.e. consumers should pass the brand colour they want
 * to appear at the primary CTA position (`action.surface.primary`).
 *
 * Output values are `rgb(r,g,b)` strings to match the curated primitive ramps in
 * `colors.ts` and to keep the CSS-variable emission pipeline unchanged.
 */
export const hexToRamp = (hex: string): ColorRamp => {
  const rgb = toRGB(hex);
  if (!rgb) {
    throw new Error(`hexToRamp: invalid colour input "${hex}"`);
  }
  const [r, g, b] = rgb as [number, number, number];
  const [h, s, anchorL] = rgbToHsl(r, g, b);

  const resolveL = (target: (typeof lightnessTargets)[number][1]): number => {
    if (target === 'anchor') return anchorL;
    if (target === 'anchor-3') return clamp(anchorL - 3, 5, 100);
    if (target === 'anchor-7') return clamp(anchorL - 7, 4, 100);
    if (target === 'anchor-12') return clamp(anchorL - 12, 3, 100);
    return target;
  };

  const ramp: Partial<ColorRamp> = {};
  for (const [step, target] of lightnessTargets) {
    const l = resolveL(target);
    const stepSat = saturationScale[step] !== undefined ? s * (saturationScale[step] as number) : s;
    ramp[step] = formatRgb(hslToRgb(h, stepSat, l));
  }
  return ramp as ColorRamp;
};
