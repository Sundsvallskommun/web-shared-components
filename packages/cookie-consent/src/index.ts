import {
  ConsentType,
  CookieConsent,
  CookieConsentProps,
  defaultCookieConsentName,
  defaultCookieConsentPath,
  getCheckableCookies,
  getConsent,
  resetConsent,
} from './cookie-consent';

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
export default { CookieConsent };
