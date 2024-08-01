import { useId } from '@reach/auto-id';
import { DefaultProps, __DEV__, cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';
import { DisclosureProps } from '../disclosure/disclosure';
import { AccordionItem } from './accordion-item';

export interface UseAccordionProps extends Pick<DisclosureProps, 'headerAs'> {
  /**
   * Will close any item open when another is opened
   * @deafult false
   */
  allowMultipleOpen?: boolean;
  /**
   * Size of the accordion
   * @default md
   */
  size?: 'sm' | 'md';
  /**
   * Inverted colors (light mode as dark mode colors and vice versa)
   * @default false
   */
  inverted?: boolean;
}

interface UseAccordionData extends UseAccordionProps {
  open?: string[];
  onClose?: (id: string) => void;
  onOpen?: (id: string) => void;
}

export interface AccordionInternalProps extends DefaultProps, UseAccordionProps, React.ComponentPropsWithRef<'ul'> {}

export const useAccordion = (): UseAccordionData => {
  const context = useAccordionContext();

  return { ...context };
};

const AccordionContext = React.createContext<UseAccordionProps>({ allowMultipleOpen: false });

const useAccordionContext = () => React.useContext(AccordionContext);

export const AccordionComponent = React.forwardRef<HTMLUListElement, AccordionInternalProps>((props, ref) => {
  const [open, setOpen] = React.useState<string[]>([]);

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

  const { className, children, allowMultipleOpen, id: _id, headerAs = 'label', size = 'md', inverted, ...rest } = props;
  const id = _id || `sk-accordion-${useId()}`;
  const labelId = `${id}-label`;

  const context = {
    allowMultipleOpen,
    open,
    onOpen,
    onClose,
    headerAs,
    size,
    inverted,
  };

  const getChildren = (): React.ReactNode => {
    return getValidChildren(children).map((child, index) => {
      switch (child?.type) {
        case AccordionItem:
          const props = { ...child?.props, id: child?.props?.id || `${id}-child-${index}` };
          return React.cloneElement(child, props);
        default:
          return child;
      }
    });
  };

  return (
    <AccordionContext.Provider value={context}>
      <div className={cx('sk-accordion', className)} data-inverted={inverted}>
        <ul ref={ref} id={id} aria-labelledby={labelId} {...rest}>
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
