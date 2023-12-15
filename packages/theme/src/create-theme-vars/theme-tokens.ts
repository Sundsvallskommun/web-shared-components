import { Dict, omit, pick } from '@sk-web-gui/utils';

const tokens = ['colors', 'cursor', 'rounded', 'fontSize', 'lineHeight', 'spacing', 'screens', 'radius'] as const;

export type ThemeScale = (typeof tokens)[number] | 'transition.duration' | 'transition.property' | 'transition.easing';

export function extractTokens(theme: Dict) {
  const _tokens = tokens as unknown as string[];
  return pick(theme, _tokens);
}

export function omitVars(rawTheme: Dict) {
  return omit(rawTheme, ['__cssMap', '__cssVars', '__breakpoints']);
}
