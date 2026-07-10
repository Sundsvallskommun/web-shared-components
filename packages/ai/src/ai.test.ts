import { describe, expect, it } from 'vitest';
import { sanitized } from './index';

describe('AI public contract', () => {
  it('keeps supported formatting and removes executable markup', () => {
    const unsafe = '<p>Hello <strong>world</strong></p><script>alert(1)</script><a href="javascript:alert(2)">link</a>';

    expect(sanitized(unsafe)).toBe('<p>Hello <strong>world</strong></p><a>link</a>');
  });
});
