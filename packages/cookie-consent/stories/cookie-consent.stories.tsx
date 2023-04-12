import { Link } from '@sk-web-gui/link';
import { Meta } from '@storybook/react';
import React from 'react';
import { CookieConsent, CookieConsentProps } from '../src/cookie-consent';

export default {
  title: 'Komponenter/Kakor/Komponent',
  component: CookieConsent,
  tags: ['autodocs'],
} as Meta;

export const Template = ({ ...args }: CookieConsentProps) => (
  <CookieConsent
    {...args}
    title="Kakor på example.sundsvall.se"
    body={
      <p>
        Vi använder kakor, cookies, för att ge dig en förbättrad upplevelse, sammanställa statistik och för att viss
        nödvändig funktionalitet ska fungera på webbplatsen. <Link href="/kakor">Läs mer om hur vi använder kakor</Link>
      </p>
    }
    cookies={[
      {
        optional: false,
        displayName: 'Nödvändiga kakor',
        description: 'Dessa kakor är nödvändiga för att webbplatsen ska fungera och kan inte stängas av i våra system.',
        cookieName: 'nessecary',
      },
      {
        optional: true,
        displayName: 'Funktionella kakor',
        description: ' Dessa kakor ger förbättrade funktioner på webbplatsen.',
        cookieName: 'func',
      },
      {
        optional: true,
        displayName: 'Kakor för statistik',
        description:
          'Dessa kakor tillåter oss att räkna besök och trafikkällor, så att vi kan mäta och förbättra prestanda på vår webbplats.',
        cookieName: 'stats',
      },
    ]}
    resetConsentOnInit={true}
    onConsent={(cookies) => {
      // Do stuff with the cookies
      alert(JSON.stringify(cookies));
    }}
    closeable={true}
  />
);

Template.storyName = 'Kakor';
