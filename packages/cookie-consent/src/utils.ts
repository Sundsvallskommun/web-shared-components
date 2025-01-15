import Cookies from 'universal-cookie';
import { CheckableConsentCookie, ConsentCookie } from './types';

export const defaultCookieConsentName = 'SKCookieConsent';
export const defaultCookieConsentPath = '/';

export const userCookie = new Cookies();

export function getConsent(): string[] {
  const cookieValue = userCookie.get(defaultCookieConsentName);
  if (!cookieValue) {
    return [];
  }
  return cookieValue.split(',');
}

export function resetConsent(options: { path: string } = { path: defaultCookieConsentPath }) {
  userCookie.remove(defaultCookieConsentName, options);
}

export function getCheckableCookies(cookies: ConsentCookie[]): CheckableConsentCookie[] {
  const getAcceptedCookies = getConsent();

  return (
    cookies?.map((cookie) => ({
      ...cookie,
      // NOTE: Accepted cookies and non-optional cookies should be checked
      isChecked: !cookie.optional || getAcceptedCookies.includes(cookie.cookieName),
    })) ?? []
  );
}
