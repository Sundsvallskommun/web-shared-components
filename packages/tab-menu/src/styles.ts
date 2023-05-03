import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useTabMenuWrapperClass = createMemoClass(({ variant, tabAlign }) => {
  const classes = cx(
    'sk-tab-menu-wrapper',
    { 'sk-tab-menu-right': variant === 'submenu' && tabAlign === 'right' },
    { 'sk-tab-menu-center': variant === 'submenu' && tabAlign === 'center' },
    { 'sk-tabs': variant === 'tabs' },
    { 'sk-tabs-stretch': variant === 'tabs' && tabAlign === 'stretch' }
  );
  return classes;
});

export const useTabMenuListClass = createMemoClass(({ variant, hideLine, tabAlign }) => {
  const classes = cx(
    { 'sk-tab-menu-list': variant === 'submenu' },
    { 'sk-tab-menu-list-stretch': variant === 'submenu' && tabAlign === 'stretch' },
    { 'sk-tabs-list': variant === 'tabs' },
    { 'sk-tabs-list-line': variant === 'tabs' && !hideLine },
    { 'sk-tabs-list-stretch': variant === 'tabs' && tabAlign === 'stretch' },
    { 'sk-tabs-list-right': variant === 'tabs' && tabAlign === 'right' },
    { 'sk-tabs-list-center': variant === 'tabs' && tabAlign === 'center' }
  );
  return classes;
});

export const useTabMenuItemClass = createMemoClass(({ variant, active, path, tabAlign }) => {
  const classes = cx(
    'sk-tab-menu-item',
    { 'sk-tab-menu-item-stretch': variant === 'submenu' && tabAlign === 'stretch' },
    { 'sk-tab-menu-item-right': variant === 'submenu' && tabAlign === 'right' },
    { 'sk-tab-menu-item-center': variant === 'submenu' && tabAlign === 'center' },
    { 'sk-tabs-tab': variant === 'tabs' },
    { 'sk-tabs-tab-stretch': variant === 'tabs' && tabAlign === 'stretch' },
    { 'sk-tabs-tab-right': variant === 'tabs' && tabAlign === 'right' },
    { 'sk-tabs-tab-center': variant === 'tabs' && tabAlign === 'center' },
    { active: active === path }
  );
  return classes;
});
