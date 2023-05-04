import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useTabMenuWrapperClass = createMemoClass(({ variant, tabAlign }) => {
  const isTabs = variant === 'tabs' || variant === 'headermenu';
  const classes = cx(
    'sk-tab-menu-wrapper',
    { 'sk-tab-menu-right': variant === 'submenu' && tabAlign === 'right' },
    { 'sk-tab-menu-center': variant === 'submenu' && tabAlign === 'center' },
    { 'sk-tabs': isTabs },
    { 'sk-tabs-stretch': isTabs && tabAlign === 'stretch' }
  );
  return classes;
});

export const useTabMenuListClass = createMemoClass(({ variant, hideLine, tabAlign }) => {
  const isTabs = variant === 'tabs' || variant === 'headermenu';
  const classes = cx(
    { 'sk-tab-menu-list': variant === 'submenu' },
    { 'sk-tab-menu-list-stretch': variant === 'submenu' && tabAlign === 'stretch' },
    { 'sk-tabs-list': isTabs },
    { 'sk-tabs-list-line': isTabs && !hideLine },
    { 'sk-tabs-list-stretch': isTabs && tabAlign === 'stretch' },
    { 'sk-tabs-list-right': isTabs && tabAlign === 'right' },
    { 'sk-tabs-list-center': isTabs && tabAlign === 'center' }
  );
  return classes;
});

export const useTabMenuItemClass = createMemoClass(({ variant, active, path, tabAlign }) => {
  const isTabs = variant === 'tabs' || variant === 'headermenu';
  const classes = cx(
    'sk-tab-menu-item',
    { 'sk-tab-menu-item-stretch': variant === 'submenu' && tabAlign === 'stretch' },
    { 'sk-tab-menu-item-right': variant === 'submenu' && tabAlign === 'right' },
    { 'sk-tab-menu-item-center': variant === 'submenu' && tabAlign === 'center' },
    { 'sk-tabs-tab': isTabs },
    { 'sk-tabs-tab-header': variant === 'headermenu' },
    { 'sk-tabs-tab-stretch': isTabs && tabAlign === 'stretch' },
    { 'sk-tabs-tab-right': isTabs && tabAlign === 'right' },
    { 'sk-tabs-tab-center': isTabs && tabAlign === 'center' },
    { active: active === path }
  );
  return classes;
});
