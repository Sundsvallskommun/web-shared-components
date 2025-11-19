import { DisclosureComponent } from './disclosure';
import type { DisclosureInternalProps } from './disclosure';
import React from 'react';
import { DisclosureHeader } from './disclosure-header';
import { DisclosureHeaderTitle } from './disclosure-header-title';
import { DisclosureHeaderIcon } from './disclosure-header-icon';
import { DisclosureHeaderButton } from './disclosure-header-button';
import { DisclosureContent } from './disclosure-content';

interface DisclosureProps extends React.ForwardRefExoticComponent<DisclosureInternalProps> {
  Component: typeof DisclosureComponent;
  Header: typeof DisclosureHeader;
  Title: typeof DisclosureHeaderTitle;
  Icon: typeof DisclosureHeaderIcon;
  Button: typeof DisclosureHeaderButton;
  Content: typeof DisclosureContent;
}

export const Disclosure = {
  ...DisclosureComponent,
  Component: DisclosureComponent,
  Header: DisclosureHeader,
  Title: DisclosureHeaderTitle,
  Icon: DisclosureHeaderIcon,
  Button: DisclosureHeaderButton,
  Content: DisclosureContent,
} as DisclosureProps;

export type { DisclosureProps };
export default Disclosure;
