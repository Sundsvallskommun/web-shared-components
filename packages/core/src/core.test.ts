import { describe, expect, it } from 'vitest';
import { AriaAttributes, DataAttributes, plugin, preset } from './index';

describe('core public contract', () => {
  it('creates a minimal preset while retaining the Web GUI plugin', () => {
    const config = preset({
      tailwindForms: false,
      tailwindContainers: false,
      dataAttributes: false,
      ariaAttributes: false,
    });

    expect(config.plugins).toHaveLength(1);
    expect(config.plugins[0]).toHaveProperty('handler', expect.any(Function));
    expect(plugin).toBeTypeOf('function');
  });

  it('exports the Tailwind attribute plugins', () => {
    expect(DataAttributes).toBeDefined();
    expect(AriaAttributes).toBeDefined();
  });
});
