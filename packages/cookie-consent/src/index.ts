import { CookieConsent, CookieConsentProps } from './cookie-consent';
import { ConsentType } from './types';
import {
  defaultCookieConsentName,
  defaultCookieConsentPath,
  getCheckableCookies,
  getConsent,
  resetConsent,
} from './utils';

const CookieConsentUtils = {
  defaultCookieConsentName,
  defaultCookieConsentPath,
  getConsent,
  resetConsent,
  getCheckableCookies,
  ConsentType,
};

export { CookieConsent, CookieConsentUtils };
export type { CookieConsentProps };
export default CookieConsent;
