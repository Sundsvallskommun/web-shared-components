import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useTabsWrapperClass = createMemoClass(({ tabAlign }) => {
  const classes = cx('sk-tabs', { 'sk-tabs-stretch': tabAlign === 'stretch' });

  return classes;
});

export const useTabsTabClass = createMemoClass(({ tabAlign, variant }) => {
  const classes = cx(
    'sk-tabs-tab',
    { 'sk-tabs-tab-header': variant === 'headermenu' },
    { 'sk-tabs-tab-stretch': tabAlign === 'stretch' },
    { 'sk-tabs-tab-right': tabAlign === 'right' },
    { 'sk-tabs-tab-center': tabAlign === 'center' }
  );

  return classes;
});

export const useTabsListClass = createMemoClass(({ tabAlign, hideLine }) => {
  const classes = cx(
    'sk-tabs-list',
    { 'sk-tabs-list-line': !hideLine },
    { 'sk-tabs-list-stretch': tabAlign === 'stretch' },
    { 'sk-tabs-list-right': tabAlign === 'right' },
    { 'sk-tabs-list-center': tabAlign === 'center' }
  );

  return classes;
});

export const useTabsIconClass = createMemoClass(({ hideLabel }) => {
  const classes = cx('sk-tabs-tab-icon', { 'sk-tabs-tab-icon-with-label': !hideLabel });

  return classes;
});
