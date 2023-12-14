import {
  ConsentType,
  CookieConsent,
  CookieConsentProps,
  defaultCookieConsentName,
  getCheckableCookies,
  getConsent,
  resetConsent,
} from './cookie-consent';

const CookieConsentUtils = {
  defaultCookieConsentName,
  getConsent,
  resetConsent,
  getCheckableCookies,
  ConsentType,
};

export { CookieConsent, CookieConsentUtils };
export type { CookieConsentProps };
export default { CookieConsent };
