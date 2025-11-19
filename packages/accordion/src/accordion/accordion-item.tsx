import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import Disclosure, { DisclosureInternalProps } from '../disclosure/disclosure';
import { UseAccordionProps } from '../accordion/accordion';
import React from 'react';
import { useAccordion } from './use-accordion';

export interface AccordionItemInternalProps
  extends DefaultProps,
    UseAccordionProps,
    React.ComponentPropsWithRef<'div'>,
    DisclosureInternalProps {}

export const AccordionItemComponent = React.forwardRef<HTMLDivElement, AccordionItemInternalProps>((props, ref) => {
  const { className, ...rest } = props;
  const { variant, size } = useAccordion();

  return (
    <li className={cx('sk-accordion-item', className)}>
      <Disclosure ref={ref} variant={variant} size={size} {...rest} />
    </li>
  );
});

if (__DEV__) {
  AccordionItemComponent.displayName = 'AccordionItem';
}

export default AccordionItemComponent;
