import { describe, expect, it } from 'vitest';
import { cssVar, toCSSVar } from './index';

describe('theme public contract', () => {
  it('creates stable CSS variable definitions and references', () => {
    expect(cssVar('colors-primary', undefined, 'sk')).toEqual({
      variable: '--sk-colors-primary',
      reference: 'var(--sk-colors-primary)',
    });
  });

  it('uses the configured prefix when converting a theme', () => {
    const theme = toCSSVar({ config: { cssVarPrefix: 'municipality' }, colors: { brand: '#123456' } });

    expect(theme.__cssVars).toMatchObject({ '--municipality-colors-brand': '#123456' });
    expect(theme.__cssMap['colors.brand'].varRef).toBe('var(--municipality-colors-brand)');
  });
});
