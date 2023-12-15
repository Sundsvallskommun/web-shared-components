import { Dict, walkObject } from '@sk-web-gui/utils';

import { ThemeScale } from './theme-tokens';
import { cssVar } from './css-var';

export interface CreateThemeVarsOptions {
  cssVarPrefix?: string;
}

export interface ThemeVars {
  cssVars: Dict;
  cssMap: Dict;
}

export function createThemeVars(target: Dict, options: CreateThemeVarsOptions) {
  const context: ThemeVars = {
    cssMap: {},
    cssVars: {},
  };

  walkObject(target, (value, path) => {
    // firstKey will be e.g. "space"
    const [firstKey] = path;

    const handler: TokenHandler = tokenHandlerMap[firstKey as keyof TokenHandlerMap] ?? tokenHandlerMap.defaultHandler;

    const { cssVars, cssMap } = handler(path, value, options);
    Object.assign(context.cssVars, cssVars);
    Object.assign(context.cssMap, cssMap);
  });

  return context;
}

type TokenHandler = (
  keys: string[],
  value: unknown | { reference: string },
  options: CreateThemeVarsOptions
) => ThemeVars;

type TokenHandlerMap = Partial<Record<ThemeScale, TokenHandler>> & {
  defaultHandler: TokenHandler;
};

/**
 * Define transformation handlers for ThemeScale
 */
const tokenHandlerMap: TokenHandlerMap = {
  defaultHandler: (keys, value, options) => {
    const lookupKey = keys.join('.');
    const varKey = keys.join('-');

    const { variable, reference } = cssVar(varKey, undefined, options.cssVarPrefix);

    return {
      cssVars: {
        [variable]: value,
      },
      cssMap: {
        [lookupKey]: {
          value,
          var: variable,
          varRef: reference,
        },
      },
    };
  },
};
