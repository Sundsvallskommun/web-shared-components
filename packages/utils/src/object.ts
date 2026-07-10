import { isObject } from './assertion';
import type { Dict } from './types';

const unsafePropertyKeys = new Set<PropertyKey>(['__proto__', 'prototype', 'constructor']);

function isSafeOwnProperty(object: object, key: PropertyKey): boolean {
  return !unsafePropertyKeys.has(key) && Object.prototype.hasOwnProperty.call(object, key);
}

export function omit<T extends Dict, K extends keyof T>(object: T, keys: K[]) {
  const result: Dict = {};

  Object.keys(object).forEach((key) => {
    if (!isSafeOwnProperty(object, key) || keys.includes(key as K)) return;
    result[key] = object[key];
  });

  return result as Omit<T, K>;
}

export function pick<T extends Dict, K extends keyof T>(object: T, keys: K[]) {
  const result = {} as { [P in K]: T[P] };

  keys.forEach((key) => {
    if (isSafeOwnProperty(object, key)) {
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
      if (!isSafeOwnProperty(source, key)) {
        return;
      }

      const targetHasOwnValue = Object.prototype.hasOwnProperty.call(target, key);
      const sourceValue = source[key as keyof T2];
      const targetValue = targetHasOwnValue ? target[key as keyof T1] : undefined;

      if (targetHasOwnValue && isObject(sourceValue) && isObject(targetValue)) {
        (output as Record<string, unknown>)[key] = deepmerge(
          targetValue as object,
          sourceValue as object,
          options
        ) as T1[keyof T1] & T2[keyof T2];
      } else {
        (output as Record<string, unknown>)[key] = sourceValue;
      }
    });
  }

  return output;
}
