import { DefaultProps, __DEV__, cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';
import { AccordionItemComponent } from './accordion-item';
import { AccordionContext } from './context';
import { DisclosureDefualtProps } from '../disclosure/disclosure';

export interface UseAccordionProps extends Pick<DisclosureDefualtProps, 'size' | 'variant'> {
  /**
   * Will close any item open when another is opened
   * @deafult false
   */
  allowMultipleOpen?: boolean;

  /**
   * Inverted colors (light mode as dark mode colors and vice versa)
   * @default false
   */
  inverted?: boolean;
}

export interface AccordionInternalProps extends DefaultProps, UseAccordionProps, React.ComponentPropsWithRef<'ul'> {}

export const AccordionComponent = React.forwardRef<HTMLUListElement, AccordionInternalProps>((props, ref) => {
  const [open, setOpen] = React.useState<string[]>([]);
  const autoId = React.useId();

  const onOpen = (id: string) => {
    if (allowMultipleOpen) {
      setOpen((open) => [...open, id]);
    } else {
      setOpen([id]);
    }
  };

  const onClose = (id: string) => {
    setOpen((open) => open.filter((openId) => openId !== id));
  };

  const { className, children, allowMultipleOpen, id: _id, variant, size: _size = 'md', inverted, ...rest } = props;
  const size = variant === 'default' && _size === 'lg' ? 'md' : _size;
  const id = _id || `sk-accordion-${autoId}`;

  const context = {
    allowMultipleOpen,
    open,
    onOpen,
    onClose,
    size,
    inverted,
    variant,
  };

  const getChildren = (): React.ReactNode => {
    return getValidChildren(children).map((child, index) => {
      switch (child?.type) {
        case AccordionItemComponent: {
          if (React.isValidElement<React.ComponentProps<typeof AccordionItemComponent>>(child)) {
            const props = { ...child?.props, id: child?.props?.id || `${id}-child-${index}` };
            return React.cloneElement(child, props);
          }
          return child;
        }
        default:
          return child;
      }
    });
  };

  return (
    <AccordionContext.Provider value={context}>
      <div className={cx('sk-accordion', className)} data-inverted={inverted}>
        <ul ref={ref} id={id} {...rest}>
          {getChildren()}
        </ul>
      </div>
    </AccordionContext.Provider>
  );
});

if (__DEV__) {
  AccordionComponent.displayName = 'AccordionComponent';
}

export default AccordionComponent;
