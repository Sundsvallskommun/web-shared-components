import React from 'react';
import { AccordionComponent, AccordionInternalProps } from './accordion';
import { AccordionItemComponent, AccordionItemInternalProps } from './accordion-item';
import { DisclosureContent } from '../disclosure/disclosure-content';
import { DisclosureHeader } from '../disclosure/disclosure-header';
import { DisclosureHeaderButton } from '../disclosure/disclosure-header-button';
import { DisclosureHeaderIcon } from '../disclosure/disclosure-header-icon';
import { DisclosureHeaderTitle } from '../disclosure/disclosure-header-title';

interface AccordionItemProps extends React.ForwardRefExoticComponent<AccordionItemInternalProps> {
  Component: typeof AccordionItemComponent;
  Header: typeof DisclosureHeader;
  Title: typeof DisclosureHeaderTitle;
  Icon: typeof DisclosureHeaderIcon;
  Button: typeof DisclosureHeaderButton;
  Content: typeof DisclosureContent;
}

const AccordionItem = {
  ...AccordionItemComponent,
  Component: AccordionItemComponent,
  Header: DisclosureHeader,
  Title: DisclosureHeaderTitle,
  Icon: DisclosureHeaderIcon,
  Button: DisclosureHeaderButton,
  Content: DisclosureContent,
} as AccordionItemProps;
interface AccordionProps extends React.ForwardRefExoticComponent<AccordionInternalProps> {
  Component: typeof AccordionComponent;
  Item: typeof AccordionItem;
}

export const Accordion: AccordionProps = {
  ...AccordionComponent,
  Component: AccordionComponent,
  Item: AccordionItem,
} as AccordionProps;

export type { AccordionProps };
export default Accordion;
