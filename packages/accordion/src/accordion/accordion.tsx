import { useId } from '@reach/auto-id';
import React from 'react';
import Disclosure, { DisclosureProps } from '../disclosure/disclosure';
import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';

interface UseAccordionProps extends Pick<DisclosureProps, 'headerAs'> {
  /** Default false, will close any item open when another is opened */
  allowMultipleOpen?: boolean;
}

interface UseAccordionData extends UseAccordionProps {
  open?: string[];
  onClose?: (id: string) => void;
  onOpen?: (id: string) => void;
}

export interface AccordionInternalProps
  extends DefaultProps,
    UseAccordionProps,
    React.HTMLAttributes<HTMLUListElement> {}

export const useAccordion = (): UseAccordionData => {
  const context = useAccordionContext();

  return { ...context };
};

const AccordionContext = React.createContext<UseAccordionProps>({ allowMultipleOpen: false });

const useAccordionContext = () => React.useContext(AccordionContext);

export const AccordionComponent = React.forwardRef<HTMLDivElement, AccordionInternalProps>((props, ref) => {
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

  const { className, children, allowMultipleOpen, id: _id, headerAs = 'label', ...rest } = props;
  const id = _id || `sk-accordion-${useId()}`;
  const labelId = `${id}-label`;

  const context = {
    allowMultipleOpen,
    open,
    onOpen,
    onClose,
    headerAs,
  };

  const getChildren = (): React.ReactNode => {
    const property = __DEV__ ? 'displayName' : 'name';
    return React.Children.toArray(children).map((child: any, index) => {
      if (child?.type[property] === Accordion.Item[property]) {
        const props = { ...child?.props, id: child?.props?.id || `${id}-child-${index}` };
        return React.cloneElement(child, props);
      } else {
        return child;
      }
    });
  };

  return (
    <AccordionContext.Provider value={context}>
      <div ref={ref} className={cx('sk-accordion', className)}>
        <ul id={id} aria-labelledby={labelId} {...rest}>
          {getChildren()}
        </ul>
      </div>
    </AccordionContext.Provider>
  );
});

const AccordionItem = React.forwardRef<HTMLDivElement, DisclosureProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <li className={cx('sk-accordion-item', className)}>
      <Disclosure ref={ref} {...rest} />
    </li>
  );
});

interface AccordionProps
  extends AccordionInternalProps,
    React.ForwardRefExoticComponent<AccordionInternalProps & React.RefAttributes<HTMLElement>> {
  Item: typeof AccordionItem;
}

export const Accordion = AccordionComponent as AccordionProps;

Accordion.Item = AccordionItem;

if (__DEV__) {
  Accordion.Item.displayName = 'AccordionItem';
  Accordion.displayName = 'Accordion';
}

export type { AccordionProps };
export default Accordion;
