import { ColorSchemeMode, getPreferredColorScheme } from '@sk-web-gui/theme';
import { addons } from '@storybook/preview-api';
import React from 'react';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

const channel = addons.getChannel();

const getHtmlBody = () => window.top?.document.querySelector('html > body');
export const htmlIsDark = () =>
  getHtmlBody()?.classList.contains('dark')
    ? true
    : getHtmlBody()?.classList.contains('light')
      ? false
      : getPreferredColorScheme() === ColorSchemeMode.Dark;

export function useDarkMode(): boolean {
  const [isDark, setDark] = React.useState(htmlIsDark());

  React.useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, setDark);
    return () => channel.off(DARK_MODE_EVENT_NAME, setDark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

  return isDark;
}
