export const semanticDefaultColors = [
  'action',
  'info',
  'warning',
  'error',
  'success',
  'alert',
  'brand',
  'accent',
] as const;

export const legacyDefaultColors = ['vattjom', 'gronsta', 'juniskar', 'bjornstigen'] as const;

export const defaultColors = [...semanticDefaultColors, ...legacyDefaultColors] as const;

export type DefaultColor = (typeof semanticDefaultColors)[number] | (string & {});

