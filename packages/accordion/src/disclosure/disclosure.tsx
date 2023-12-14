import { useId } from '@reach/auto-id';
import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React from 'react';
import { useAccordion } from '../accordion/accordion';
import { Button } from '@sk-web-gui/button';
import { useDisclosureClass } from './styles';

interface IDisclosureProps extends DefaultProps {
  initalOpen?: boolean;
  header: React.ReactNode;
  /* Makes disclosure disabled */
  disabled?: boolean;
  /* Element to wrap header in. Defaults to label */
  headerAs?: React.ElementType;
  /* React node */
  children?: React.ReactNode;
  /* Id of the panel */
  id?: string;
  /* Returns true if opened, false if closed */
  onToggleOpen?: (open: boolean) => void;
  /**
   * Size of the disclosure
   * @default md
   */
  size?: 'sm' | 'md';
}

export interface DisclosureProps extends React.ComponentPropsWithRef<'div'>, IDisclosureProps {}

export const Disclosure = React.forwardRef<HTMLDivElement, DisclosureProps>((props, ref) => {
  const {
    disabled,
    initalOpen,
    header,
    children,
    className,
    headerAs,
    id: _id,
    onToggleOpen,
    size: _size,
    ...rest
  } = props;
  const { open, onClose, onOpen, ...context } = useAccordion();
  const size = _size || context.size || 'md';

  const Comp = headerAs || context.headerAs || 'label';

  const [disclosureOpen, setDisclosureOpen] = React.useState(initalOpen || false);
  const id = _id || `sk-disclosure-${useId()}`;

  React.useEffect(() => {
    if (onClose && onOpen) {
      if (open?.includes(id)) {
        setDisclosureOpen(true);
      }
      if (!open?.includes(id)) {
        setDisclosureOpen(false);
      }
    }
  }, [open]);

  React.useEffect(() => {
    initalOpen && onOpen && onOpen(id);
  }, [initalOpen]);

  const onClick = () => {
    if (!disabled) {
      if (disclosureOpen) {
        onClose && onClose(id);
        onToggleOpen && onToggleOpen(false);
      } else {
        onOpen && onOpen(id);
        onToggleOpen && onToggleOpen(true);
      }

      setDisclosureOpen(!disclosureOpen);
    }
  };

  const classes = useDisclosureClass({ size, disabled });
  return (
    <div
      ref={ref}
      className={cx(classes, disclosureOpen ? 'sk-disclosure-is-open' : undefined, className)}
      id={id}
      data-open={disclosureOpen}
      {...rest}
    >
      <div
        className="sk-disclosure-header"
        aria-disabled={disabled ? disabled : undefined}
        data-disabled={disabled ? disabled : undefined}
        id={`${id}-header`}
        onClick={onClick}
      >
        <div className="sk-disclosure-toggle">
          <div className="w-full">
            <Comp className="sk-disclosure-title" id={`${id}-label`}>
              {header}
            </Comp>
          </div>
          <Button
            disabled={disabled}
            variant="ghost"
            iconButton
            size={size}
            className="sk-disclosure-header-icon"
            onClick={onClick}
            aria-controls={`${id}-content`}
            aria-expanded={disclosureOpen}
            aria-labelledby={`${id}-label`}
          >
            {disclosureOpen ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
      </div>
      <div className={`sk-disclosure-body ${disclosureOpen && 'overflow-visible'}`} aria-hidden={!disclosureOpen}>
        <div role="region" aria-labelledby={`${id}-header`} id={`${id}-content`}>
          {children}
        </div>
      </div>
    </div>
  );
});

if (__DEV__) {
  Disclosure.displayName = 'Disclosure';
}

export default Disclosure;
