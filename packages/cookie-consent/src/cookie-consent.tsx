import { DefaultProps, cx, __DEV__ } from '@sk-web-gui/utils';
import { Dialog as D, Transition } from '@headlessui/react';
import { Button } from '@sk-web-gui/button';
import { Checkbox } from '@sk-web-gui/forms';
import Cookies, { CookieSetOptions } from 'universal-cookie';
import React from 'react';

export const defaultCookieConsentName = 'SKCookieConsent';
export const defaultCookieConsentPath = '/';

export interface ConsentCookie {
  optional: boolean;
  displayName: string;
  description: string;
  cookieName: string;
}

export interface CheckableConsentCookie extends ConsentCookie {
  isChecked: boolean;
}

export enum ConsentType {
  Necessary = 'Necessary',
  All = 'All',
  Custom = 'Custom',
}

const userCookie = new Cookies();

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

export interface CookieConsentProps extends DefaultProps, Omit<React.ComponentPropsWithRef<'div'>, 'title'> {
  isOpen?: boolean;
  onConsent: (cookies: ConsentCookie[]) => void;
  cookies: ConsentCookie[];
  title: string;
  body: React.ReactNode;
  resetConsentOnInit: boolean;
  options?: CookieSetOptions;
  basePath?: string;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
  title,
  body,
  onConsent,
  cookies = [],
  resetConsentOnInit = false,
  className,
  basePath = '',
  options = {
    maxAge: 31536000, // default 12 months according to ePrivacy, EU
    sameSite: 'strict',
    path: basePath + defaultCookieConsentPath,
  },
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHandlingOptions, setIsHandlingOptions] = React.useState(false);

  if (resetConsentOnInit) {
    resetConsent();
  }

  const initialFocus = React.useRef<HTMLDivElement>(null);
  const approveFocus = React.useRef<HTMLButtonElement>(null);
  const settingsFocus = React.useRef<HTMLButtonElement>(null);

  const [checkableCookies, setCheckableCookies] = React.useState(getCheckableCookies(cookies));

  const setSettingsFocus = () => {
    setTimeout(() => {
      settingsFocus.current && settingsFocus.current.focus();
    });
  };

  const setApproveFocus = () => {
    setTimeout(() => {
      approveFocus.current && approveFocus.current?.focus();
    });
  };

  const handleOnCheck = (index: number) => {
    const newCheckableCookies = [...checkableCookies];
    newCheckableCookies[index].isChecked = !newCheckableCookies[index].isChecked;
    setCheckableCookies(newCheckableCookies);
  };

  const handleonConsent = (consentType: ConsentType) => {
    if (onConsent) {
      switch (consentType) {
        case ConsentType.All:
          userCookie.set(
            defaultCookieConsentName,
            checkableCookies.map((cookie) => cookie.cookieName).join(','),
            options
          );
          onConsent(checkableCookies);
          break;
        case ConsentType.Necessary:
          userCookie.set(
            defaultCookieConsentName,
            checkableCookies
              .filter((cookie) => !cookie.optional)
              .map((cookie) => cookie.cookieName)
              .join(','),
            options
          );
          onConsent(checkableCookies.filter((cookie) => !cookie.optional));
          break;
        case ConsentType.Custom:
          userCookie.set(
            defaultCookieConsentName,
            checkableCookies
              .filter((cookie) => cookie.isChecked)
              .map((cookie) => cookie.cookieName)
              .join(','),
            options
          );
          onConsent(checkableCookies.filter((cookie) => cookie.isChecked));
          break;
      }
    }
    setIsOpen(false);
  };

  React.useEffect(() => {
    const isOpen = !getConsent().length;
    setIsOpen(isOpen);
  }, [setIsOpen]);

  return (
    <Transition show={isOpen}>
      <D
        initialFocus={initialFocus}
        open={isOpen}
        onClose={() => false}
        as="div"
        className={cx('sk-cookie-consent-wrapper', className)}
      >
        <div className="sk-cookie-consent">
          <D.Overlay />
          <div className="sk-cookie-consent-content-wrapper">
            <div className="sk-cookie-consent-body">
              <D.Title className="sk-cookie-consent-title">{title}</D.Title>

              <D.Description as="div" className="sk-cookie-consent-description">
                {!isHandlingOptions && <>{body}</>}

                {isHandlingOptions && (
                  <>
                    <fieldset className="sk-cookie-consent-custom-wrapper">
                      <legend className="text-label font-bold">Välj vilka kakor vi får använda</legend>
                      {checkableCookies.map((cookie, index) => (
                        <div key={cookie.cookieName}>
                          <Checkbox
                            checked={cookie.isChecked || !cookie.optional}
                            onChange={() => handleOnCheck(index)}
                            disabled={!cookie.optional}
                          >
                            <strong>{cookie.displayName}</strong> – {cookie.description}
                          </Checkbox>
                        </div>
                      ))}
                    </fieldset>
                  </>
                )}
              </D.Description>
            </div>

            <div className="sk-cookie-consent-btn-wrapper">
              {!isHandlingOptions && (
                <>
                  <Button
                    onClick={() => handleonConsent(ConsentType.All)}
                    color="vattjom"
                    variant="primary"
                    ref={approveFocus}
                  >
                    Godkänn alla
                  </Button>
                  <Button onClick={() => handleonConsent(ConsentType.Necessary)} color="vattjom" variant="primary">
                    Godkänn endast nödvändiga
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsHandlingOptions(true);
                      setSettingsFocus();
                    }}
                  >
                    Hantera kakor
                  </Button>
                </>
              )}
              {isHandlingOptions && (
                <>
                  <Button
                    ref={settingsFocus}
                    onClick={() => handleonConsent(ConsentType.Custom)}
                    color="vattjom"
                    variant="primary"
                  >
                    Spara mina val
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsHandlingOptions(false);
                      setApproveFocus();
                    }}
                  >
                    Stäng
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </D>
    </Transition>
  );
};

if (__DEV__) {
  CookieConsent.displayName = 'CookieConsent';
}

export default CookieConsent;
