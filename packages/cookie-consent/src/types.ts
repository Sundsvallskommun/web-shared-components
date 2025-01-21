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
