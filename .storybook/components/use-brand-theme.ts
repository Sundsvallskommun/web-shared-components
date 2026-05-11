import { BrandTheme } from '@sk-web-gui/theme';
import { addons } from '@storybook/preview-api';
import React from 'react';

const channel = addons.getChannel();

// Storybook fires 'setGlobals' once on preview init and 'globalsUpdated' on every
// toolbar change. Both payloads carry `{ globals }`. Mirrors the channel-listener
// approach used by useDarkMode so that docs pages (which don't run WithGuiDecorator)
// still react to the org-theme toolbar.
const SET_GLOBALS = 'setGlobals';
const GLOBALS_UPDATED = 'globalsUpdated';

const readBrandTheme = (globals: unknown): BrandTheme | undefined => {
  const value = (globals as { brandTheme?: unknown } | undefined)?.brandTheme;
  return typeof value === 'string' ? (value as BrandTheme) : undefined;
};

export function useBrandTheme(seed?: BrandTheme): BrandTheme {
  const [brandTheme, setBrandTheme] = React.useState<BrandTheme>(seed ?? 'sundsvall');

  React.useEffect(() => {
    const handler = ({ globals }: { globals?: unknown }) => {
      const next = readBrandTheme(globals);
      if (next) setBrandTheme(next);
    };
    channel.on(SET_GLOBALS, handler);
    channel.on(GLOBALS_UPDATED, handler);
    return () => {
      channel.off(SET_GLOBALS, handler);
      channel.off(GLOBALS_UPDATED, handler);
    };
  }, []);

  return brandTheme;
}
