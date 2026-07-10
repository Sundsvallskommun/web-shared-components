import { describe, expect, it } from 'vitest';
import { Tabs as tabsStyles } from './components/tabs';
import { AriaAttributes, DataAttributes, plugin, preset } from './index';
import withOpacity from './with-opacity';

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

  it('owns the Tabs indicator color through a semantic core token', () => {
    const styles = tabsStyles();
    const tabItemStyles = styles['.sk-tabs']['&-list']['&-item'];

    expect(tabItemStyles['.sk-tabs-list-item-divider']).toHaveProperty(
      '@apply m-0 min-h-2 h-2 opacity-0 bg-primary-surface'
    );
    expect(tabItemStyles['.sk-tabs-list-item-button[data-state="active"] + .sk-tabs-list-item-divider']).toHaveProperty(
      '@apply opacity-100'
    );
  });

  it('resolves theme variables with and without Tailwind opacity', () => {
    const resolveColor = withOpacity('--sk-colors-primary-surface');

    expect(resolveColor({ opacityValue: '0.5' })).toBe('rgba(var(--sk-colors-primary-surface), 0.5)');
    expect(resolveColor({ opacityValue: '' })).toBe('rgb(var(--sk-colors-primary-surface))');
  });
});
