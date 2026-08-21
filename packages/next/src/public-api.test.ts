import { describe, expect, it } from 'vitest';
import * as NextWebGui from './index';

describe('Next.js package public contract', () => {
  it('aggregates Next.js adapters and shared components', () => {
    expect(NextWebGui.NextLink).toBeDefined();
    expect(NextWebGui.Card).toBeDefined();
    expect(NextWebGui.MetaCard).toBeDefined();
  });
});
