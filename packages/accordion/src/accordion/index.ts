import React from 'react';
import { AccordionComponent, AccordionInternalProps } from './accordion';
import AccordionItem from './accordion-item';

interface AccordionProps extends React.ForwardRefExoticComponent<AccordionInternalProps> {
  Component: typeof AccordionComponent;
  Item: typeof AccordionItem;
}

export const Accordion = {
  ...AccordionComponent,
  Component: AccordionComponent,
  Item: AccordionItem,
} as AccordionProps;

export type { AccordionProps };
export default Accordion;
