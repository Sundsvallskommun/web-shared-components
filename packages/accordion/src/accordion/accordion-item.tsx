import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import Disclosure, { DisclosureProps } from '../disclosure/disclosure';
import { UseAccordionProps } from '../accordion/accordion';
import React from 'react';

export interface AccordionItemProps extends DefaultProps, UseAccordionProps, React.ComponentPropsWithRef<'li'> {}

const AccordionItem = React.forwardRef<HTMLDivElement, DisclosureProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <li className={cx('sk-accordion-item', className)}>
      <Disclosure ref={ref} {...rest} />
    </li>
  );
});

if (__DEV__) {
  AccordionItem.displayName = 'AccordionItem';
}

export default AccordionItem;
