import { BrandTheme, sundsvallTheme } from '@sk-web-gui/theme';
import { addons } from '@storybook/preview-api';
import React from 'react';

const channel = addons.getChannel();

// Storybook fires 'setGlobals' once on preview init and 'globalsUpdated' on every
// toolbar change. Both payloads carry `{ globals }`. Mirrors the channel-listener
// approach used by useDarkMode so that docs pages (which don't run WithGuiDecorator)
// still react to the org-theme toolbar.
const SET_GLOBALS = 'setGlobals';
const GLOBALS_UPDATED = 'globalsUpdated';

// Maps the toolbar-global string key to a concrete BrandTheme object. Adding a new entry
// here automatically lights up that option in the preview.tsx toolbar items list.
const brandThemes: Record<string, BrandTheme> = {
  sundsvall: sundsvallTheme,
  // Example alternative org so the toolbar exercises the BrandTheme override path.
  aldeeran: {
    name: 'Aldeeran (exempel-org)',
    mode: {
      primary: '#0F9685',
      secondary: '#C27C12',
      tertiary: '#5B1F78',
    },
  },
};

const readBrandThemeKey = (globals: unknown): string | undefined => {
  const value = (globals as { brandTheme?: unknown } | undefined)?.brandTheme;
  return typeof value === 'string' ? value : undefined;
};

export function useBrandTheme(seedKey?: string): BrandTheme {
  const [key, setKey] = React.useState<string>(seedKey ?? 'sundsvall');

  React.useEffect(() => {
    const handler = ({ globals }: { globals?: unknown }) => {
      const next = readBrandThemeKey(globals);
      if (next) setKey(next);
    };
    channel.on(SET_GLOBALS, handler);
    channel.on(GLOBALS_UPDATED, handler);
    return () => {
      channel.off(SET_GLOBALS, handler);
      channel.off(GLOBALS_UPDATED, handler);
    };
  }, []);

  return brandThemes[key] ?? sundsvallTheme;
}
