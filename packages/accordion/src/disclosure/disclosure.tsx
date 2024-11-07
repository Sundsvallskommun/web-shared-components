import { useId } from '@reach/auto-id';
import { Button } from '@sk-web-gui/button';
import { Divider } from '@sk-web-gui/divider';
import { Icon } from '@sk-web-gui/icon';
import { Label } from '@sk-web-gui/label';
import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import { Minus, Plus } from 'lucide-react';
import React from 'react';
import { useAccordion } from '../accordion/accordion';
import { useDisclosureClass } from './styles';

export interface DisclosureProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
  /**
   * Open disclosure from start
   * @default false
   */
  initalOpen?: boolean;
  /**
   * Control open state externally
   * @default undefined
   */
  open?: boolean;
  /** Header. */
  header: React.ReactNode;
  /** Makes disclosure disabled */
  disabled?: boolean;
  /**
   * Element to wrap header in.
   * @default label
   */
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
  size?: 'sm' | 'md' | 'lg';
  /**
   * Style variant,
   */
  variant?: 'default' | 'alt';
  /** Leading icon. Will be displayed before the header */
  icon?: React.ReactNode;
  /** Support text. Will be displayed after the header. */
  supportText?: string;
  /** Label. Will be displayed after the header. */
  label?: string;
  /** Color of the label
   * @default gronsta
   */
  labelColor?: React.ComponentProps<typeof Label>['color'];
  /** Inverts the colors of the label
   * @default true - if inverted is false.
   */
  labelInverted?: React.ComponentProps<typeof Label>['inverted'];
  /**
   * Inverted colors (light mode as dark mode colors and vice versa)
   * @default false
   */
  inverted?: boolean;
}

export const Disclosure = React.forwardRef<HTMLDivElement, DisclosureProps>((props, ref) => {
  const {
    disabled,
    initalOpen = false,
    open = undefined,
    header,
    children,
    className,
    headerAs,
    id: _id,
    onToggleOpen,
    size: _size,
    variant = 'default',
    icon,
    supportText,
    label,
    inverted: _inverted,
    labelColor = 'gronsta',
    labelInverted: _labelInverted,
    ...rest
  } = props;
  const { onClose, onOpen, ...context } = useAccordion();
  const size = _size || context.size || 'md';
  const _open = context.open;
  const Comp = headerAs || context.headerAs || 'label';
  const inverted = _inverted ?? context.inverted;
  const labelInverted = (_labelInverted ?? inverted) ? false : true;
  const [disclosureOpen, setDisclosureOpen] = React.useState(open || initalOpen);
  const id = _id || `sk-disclosure-${useId()}`;

  React.useEffect(() => {
    if (onClose && onOpen) {
      if (_open?.includes(id)) {
        setDisclosureOpen(true);
      }
      if (!_open?.includes(id)) {
        setDisclosureOpen(false);
      }
    }
  }, [_open]);

  React.useEffect(() => {
    if (open !== undefined) {
      if (open) {
        onClose && onClose(id);
      } else {
        onOpen && onOpen(id);
      }
      setDisclosureOpen(open);
    }
  }, [open]);

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

  const classes = useDisclosureClass({ size, disabled, variant });
  return (
    <div
      ref={ref}
      className={cx(classes, disclosureOpen ? 'sk-disclosure-is-open' : undefined, className)}
      id={id}
      data-open={disclosureOpen}
      data-variant={variant}
      data-inverted={inverted}
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
          <div className="sk-disclosure-icon">{icon}</div>
          <div className="sk-disclosure-title-wrapper">
            <Comp className="sk-disclosure-title" id={`${id}-label`}>
              {header}
            </Comp>
            {variant === 'alt' && <Divider></Divider>}
          </div>
          {supportText && <span className="sk-disclosure-support">{supportText}</span>}
          {label && (
            <Label className="sk-disclosure-label" color={labelColor} inverted={labelInverted} rounded>
              {label}
            </Label>
          )}
          <Button
            disabled={disabled}
            variant={variant === 'default' ? 'ghost' : 'tertiary'}
            iconButton
            inverted={inverted}
            size={variant === 'default' ? size : 'sm'}
            className="sk-disclosure-header-icon"
            aria-controls={`${id}-content`}
            aria-expanded={disclosureOpen}
            aria-labelledby={`${id}-label`}
          >
            {<Icon icon={disclosureOpen ? <Minus /> : <Plus />} />}
          </Button>
        </div>
      </div>
      <div
        className={`sk-disclosure-body ${disclosureOpen && 'overflow-visible'}`}
        data-has-icon={!!icon}
        data-variant={variant}
        data-size={size === 'lg' && variant === 'default' ? 'md' : size}
        aria-hidden={!disclosureOpen}
      >
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
