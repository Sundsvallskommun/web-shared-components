import { DefaultProps } from "@sk-web-gui/theme";
import { __DEV__ } from "@sk-web-gui/utils";
import { Dialog as D, Transition } from '@headlessui/react'
import { Button, Switch } from '@sk-web-gui/react';
import { useEffect, useRef, useState } from "react";
import Cookies from 'universal-cookie';
import * as React from "react";

export const defaultCookieConsentName = 'SKCookieConsent';

import { useCookieConsentClass } from "./styles";

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

export function resetConsent() {
    userCookie.remove(defaultCookieConsentName);
}

export function getCheckableCookies(cookies: ConsentCookie[]): CheckableConsentCookie[] {
  const getAcceptedCookies = getConsent();

  return cookies?.map((cookie) => ({
      ...cookie,
      // NOTE: Accepted cookies and non-optional cookies should be checked
      isChecked: !cookie.optional || getAcceptedCookies.includes(cookie.cookieName)
  })) ?? [];
}

interface CookieConsentProps extends DefaultProps {
  isOpen?: boolean;
  // eslint-disable-next-line no-unused-vars
  onConsent: (cookies: ConsentCookie[]) => void;
  closeable?: boolean;
  onDecline?: () => void;
  cookies: ConsentCookie[];
  title: string;
  body: any;
  resetConsentOnInit: boolean;
}

/* export interface CookieConsentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    ICookieConsentProps {} */

  export function CookieConsent({
      title,
      body,
      onConsent,
      cookies = [],
      onDecline,
      closeable = false,
      resetConsentOnInit = false,
  }: CookieConsentProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [isHandlingOptions, setIsHandlingOptions] = useState(false);

    if (resetConsentOnInit) {
      resetConsent();
    }
    
    
    let initialFocus = useRef<any>(null);
    let settingsFocus = useRef<any>(null);

    const [ checkableCookies, setCheckableCookies ] = useState(getCheckableCookies(cookies));

    const setSettingsFocus = () => {
        setTimeout(() => {
            settingsFocus.current &&  settingsFocus.current.focus();
        });
    };
    const setInitialFocus = () => {
        setTimeout(() => {
            initialFocus.current &&  initialFocus.current?.focus()
        });
    };

    const handleOnClose = () => {
        if (onDecline) {
            onDecline();
        }
        userCookie.set(defaultCookieConsentName, '');
        setIsOpen(false);
    }

    const handleOnCheck = (index: number) => {
        const newCheckableCookies = [
            ...checkableCookies,
        ];
        newCheckableCookies[index].isChecked = !newCheckableCookies[index].isChecked;
        setCheckableCookies(newCheckableCookies);
    }

    const handleonConsent = (consentType: ConsentType) => {
        if (onConsent) {
            switch (consentType) {
                case ConsentType.All:
                    userCookie.set(defaultCookieConsentName, checkableCookies.map(cookie => cookie.cookieName).join(','));
                    onConsent(checkableCookies);
                    break;
                case ConsentType.Necessary:
                    userCookie.set(defaultCookieConsentName, checkableCookies.filter((cookie) => !cookie.optional).map(cookie => cookie.cookieName).join(','));
                    onConsent(checkableCookies.filter((cookie) => !cookie.optional));
                    break;
                case ConsentType.Custom:
                    userCookie.set(defaultCookieConsentName, checkableCookies.filter((cookie) => cookie.isChecked).map(cookie => cookie.cookieName).join(','));
                    onConsent(checkableCookies.filter((cookie) => cookie.isChecked));
                    break;
            }
        }
        setIsOpen(false);
    }

    useEffect(() => {
        const isOpen = !getConsent().length;
        setIsOpen(isOpen);
    }, [setIsOpen]);

    return (
        <Transition
            show={isOpen}
            //enter="transition duration-100 ease-out"
            //enterFrom="transform scale-95 opacity-0"
            //enterTo="transform scale-100 opacity-100"
            //leave="transition duration-75 ease-out"
            //leaveFrom="transform scale-100 opacity-100"
            //leaveTo="transform scale-95 opacity-0"
        >
            <D
                initialFocus={initialFocus}
                open={isOpen}
                onClose={() => false}
                as="div"
                style={{ boxShadow: "0px -4px 14px rgba(27, 29, 31, 0.12)" }}
                className="cookie-consent"
            >
                <div className="cookie-consent-content-wrapper">

                    {closeable && <button className="cookie-consent-close-btn" onClick={() => handleOnClose()}>
                        <span className="material-icons-outlined">close</span>
                    </button>}

                    <D.Overlay />

                    <D.Title className="cookie-consent-title">
                        {title}
                    </D.Title>

                    <D.Description as="div" className="cookie-consent-description">
                        {!isHandlingOptions && <>
                            {body}
                        </>}

                        {isHandlingOptions && <>
                            <div className="bg-gray-lighter p-8">
                                <h6>Välj vilka kakor vi får använda</h6>
                                {checkableCookies.map((cookie, index) => 
                                    <div key={cookie.cookieName} className="my-6">
                                        <span className="w-12 inline-block">{(cookie.isChecked || !cookie.optional) ? 'På' : 'Av'}</span><Switch className="mr-4" aria-label={`check z`} checked={(cookie.isChecked || !cookie.optional)} onChange={() => handleOnCheck(index)} disabled={!cookie.optional} />
                                        <strong>{cookie.displayName}</strong> – {cookie.description}
                                    </div>
                                )}
                            </div>
                        </>}
                    </D.Description>

                    <div className="cookie-consent-btn-wrapper">
                        {!isHandlingOptions && <>
                            <Button onClick={() => handleonConsent(ConsentType.All)} color="primary" variant="solid" ref={initialFocus}>Godkänn alla</Button>
                            <Button onClick={() => handleonConsent(ConsentType.Necessary)} color="primary" variant="solid">Godkänn endast nödvändiga</Button>
                            <Button onClick={() => { setIsHandlingOptions(true); setSettingsFocus()}}>Hantera kakor</Button>
                        </>}
                        {isHandlingOptions && <>
                            <Button ref={settingsFocus} onClick={() => handleonConsent(ConsentType.Custom)} color="primary" variant="solid">Spara mina val</Button>
                            <Button onClick={() => { setIsHandlingOptions(false); setInitialFocus() }}>Stäng</Button>
                        </>}
                    </div>

                </div>
            </D>
        </Transition>
    )
};

if (__DEV__) {
  CookieConsent.displayName = "CookieConsent";
}