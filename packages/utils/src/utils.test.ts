import { describe, expect, it, vi } from 'vitest';
import { deepmerge, omit, pick, rgbStringToHex, toColor, toSlug, walkObject } from './index';

describe('utils public contract', () => {
  it('creates normalized slugs from Swedish text', () => {
    expect(toSlug('  Ångermanland & Öar  ')).toBe('angermanland-oar');
  });

  it('trims long whitespace sequences when creating slugs', () => {
    const whitespace = ' '.repeat(100_000);

    expect(toSlug(`${whitespace}Säker slug${whitespace}`)).toBe('saker-slug');
  });

  it('picks and omits keys without changing the input', () => {
    const input = { id: 1, name: 'Ada', internal: true };

    expect(pick(input, ['id', 'name'])).toEqual({ id: 1, name: 'Ada' });
    expect(omit(input, ['internal'])).toEqual({ id: 1, name: 'Ada' });
    expect(input).toEqual({ id: 1, name: 'Ada', internal: true });
  });

  it('does not copy inherited or prototype-mutating properties', () => {
    const input = JSON.parse('{"safe":true,"__proto__":{"polluted":true},"constructor":{"polluted":true}}') as {
      safe: boolean;
      __proto__: { polluted: boolean };
      constructor: { polluted: boolean };
    };
    const inherited = Object.assign(Object.create({ inherited: true }) as Record<string, unknown>, input);

    const picked = pick(inherited, ['safe', '__proto__', 'constructor', 'inherited']);
    const omitted = omit(input, []);

    expect(picked).toEqual({ safe: true });
    expect(omitted).toEqual({ safe: true });
    expect(Object.getPrototypeOf(picked)).toBe(Object.prototype);
    expect(Object.getPrototypeOf(omitted)).toBe(Object.prototype);
  });

  it('deeply merges objects and ignores prototype pollution keys', () => {
    const target = { nested: { left: 1 } };
    const source = JSON.parse('{"nested":{"right":2},"__proto__":{"polluted":true}}') as {
      nested: { right: number };
    };
    const result = deepmerge(target, source, { clone: true });

    expect(result).toEqual({ nested: { left: 1, right: 2 } });
    expect(target).toEqual({ nested: { left: 1 } });
    expect(Object.prototype).not.toHaveProperty('polluted');
  });

  it('blocks nested JSON prototype pollution payloads', () => {
    const source = JSON.parse(
      '{"nested":{"safe":true,"__proto__":{"__deepmergePolluted__":true},"constructor":{"prototype":{"__deepmergePolluted__":true}},"prototype":{"__deepmergePolluted__":true}}}'
    ) as { nested: { safe: boolean } };

    try {
      const result = deepmerge({ nested: { existing: true } }, source);

      expect(result).toEqual({ nested: { existing: true, safe: true } });
      expect(Object.prototype).not.toHaveProperty('__deepmergePolluted__');
    } finally {
      delete (Object.prototype as Record<string, unknown>).__deepmergePolluted__;
    }
  });

  it('does not merge into inherited target properties', () => {
    const inheritedNested = { inherited: true };
    const target = Object.create({ nested: inheritedNested }) as { nested?: { own: boolean } };
    const source = { nested: { own: true } };
    const result = deepmerge(target, source);

    expect(Object.prototype.hasOwnProperty.call(result, 'nested')).toBe(true);
    expect(result.nested).toEqual({ own: true });
    expect(inheritedNested).toEqual({ inherited: true });
  });

  it('walks every leaf with its canonical path', () => {
    const predicate = vi.fn((value: unknown, path: string[]) => `${path.join('.')}:${value}`);

    expect(walkObject({ user: { names: ['Ada', 'Grace'] } }, predicate)).toEqual({
      user: { names: ['user.names.0:Ada', 'user.names.1:Grace'] },
    });
    expect(predicate).toHaveBeenCalledTimes(2);
  });

  it('normalizes supported color formats', () => {
    expect(rgbStringToHex('rgb(0, 85, 149)')).toBe('#005595');
    expect(toColor('rgba(0, 85, 149, 0.5)')).toEqual({ color: '0, 85, 149', opacity: '0.5' });
  });
});
