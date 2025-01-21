import { isObject } from './assertion';
import type { Dict } from './types';

export function omit<T extends Dict, K extends keyof T>(object: T, keys: K[]) {
  const result: Dict = {};

  Object.keys(object).forEach((key) => {
    if (keys.includes(key as K)) return;
    result[key] = object[key];
  });

  return result as Omit<T, K>;
}

export function pick<T extends Dict, K extends keyof T>(object: T, keys: K[]) {
  const result = {} as { [P in K]: T[P] };

  keys.forEach((key) => {
    if (key in object) {
      result[key] = object[key];
    }
  });

  return result;
}

export function deepmerge<T1 extends object, T2 extends object>(
  target: Partial<T1>,
  source: Partial<T2>,
  options: { clone: boolean } = { clone: false }
): Partial<T1 & T2> {
  const output: Partial<T1 & T2> = (options.clone ? { ...target } : target) as Partial<T1 & T2>;

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      // Avoid prototype pollution
      if (key === '__proto__') {
        return;
      }

      // Type-safe access to source and target
      const sourceValue = source[key as keyof T2];
      const targetValue = target[key as keyof T1];

      if (isObject(sourceValue) && key in target) {
        // Recursively merge objects
        (output as Record<string, unknown>)[key] = deepmerge(
          targetValue as object,
          sourceValue as object,
          options
        ) as T1[keyof T1] & T2[keyof T2];
      } else {
        // Assign value directly
        (output as Record<string, unknown>)[key] = sourceValue;
      }
    });
  }

  return output;
}
