import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import Disclosure, { DisclosureProps } from '../disclosure/disclosure';
import { UseAccordionProps } from '../accordion/accordion';
import React from 'react';

export interface AccordionItemProps
  extends DefaultProps,
    UseAccordionProps,
    React.ComponentPropsWithRef<'div'>,
    Omit<DisclosureProps, 'size' | 'variant'> {}

export const AccordionItem: React.FC<AccordionItemProps> = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return (
      <li className={cx('sk-accordion-item', className)}>
        <Disclosure ref={ref} variant="default" {...rest} />
      </li>
    );
  }
);

if (__DEV__) {
  AccordionItem.displayName = 'AccordionItem';
}

export default AccordionItem;
