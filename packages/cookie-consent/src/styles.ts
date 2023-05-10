import { createMemoClass } from '@sk-web-gui/theme';
import { cx } from '@sk-web-gui/utils';

export const useCookieConsentClass = createMemoClass((props) => {
  const classes = cx('cookie-consent');

  return classes;
});
