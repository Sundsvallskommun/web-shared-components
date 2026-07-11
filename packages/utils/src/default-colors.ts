export const semanticDefaultColors = [
  'action',
  'info',
  'warning',
  'error',
  'success',
  'alert',
  'brand',
  'accent',
  'tertiary-brand',
] as const;

/**
 * Place-named brand identity tokens kept as Tailwind aliases for backward compatibility.
 * Consumer apps with class names like `bg-vattjom-surface-accent` keep working — the
 * tokens now resolve to the fixed identity primitives (blue/green/pink/purple) rather
 * than the consumer's active mode colours. Prefer `action-*` / `accent-*` /
 * `tertiary-brand-*` in new code.
 *
 * @deprecated Will be removed in a future major version.
 */
export const legacyDefaultColors = ['vattjom', 'gronsta', 'juniskar', 'bjornstigen'] as const;

export const defaultColors = [...semanticDefaultColors, ...legacyDefaultColors] as const;

export type DefaultColor = (typeof semanticDefaultColors)[number] | (string & {});

