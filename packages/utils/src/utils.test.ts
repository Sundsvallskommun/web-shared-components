import { describe, expect, it, vi } from 'vitest';
import { deepmerge, omit, pick, rgbStringToHex, toColor, toSlug, walkObject } from './index';

describe('utils public contract', () => {
  it('creates normalized slugs from Swedish text', () => {
    expect(toSlug('  Ångermanland & Öar  ')).toBe('angermanland-oar');
  });

  it('picks and omits keys without changing the input', () => {
    const input = { id: 1, name: 'Ada', internal: true };

    expect(pick(input, ['id', 'name'])).toEqual({ id: 1, name: 'Ada' });
    expect(omit(input, ['internal'])).toEqual({ id: 1, name: 'Ada' });
    expect(input).toEqual({ id: 1, name: 'Ada', internal: true });
  });

  it('deeply merges objects and ignores prototype pollution keys', () => {
    const source = JSON.parse('{"nested":{"right":2},"__proto__":{"polluted":true}}') as {
      nested: { right: number };
    };
    const result = deepmerge({ nested: { left: 1 } }, source, { clone: true });

    expect(result).toEqual({ nested: { left: 1, right: 2 } });
    expect(Object.prototype).not.toHaveProperty('polluted');
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
