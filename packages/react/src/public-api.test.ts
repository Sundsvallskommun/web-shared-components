import { describe, expect, it } from 'vitest';
import * as WebGui from './index';

describe('React package public contract', () => {
  it('exports the curated component and utility surface', () => {
    expect(WebGui.Button).toBeDefined();
    expect(WebGui.Modal).toBeDefined();
    expect(WebGui.SegmentedControl).toBeDefined();
    expect(WebGui.Table).toBeDefined();
    expect(WebGui.GuiProvider).toBeDefined();
    expect(WebGui.toSlug).toBeTypeOf('function');
  });
});
