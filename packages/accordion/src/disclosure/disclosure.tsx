import { useId } from '@reach/auto-id';
import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';
import { useAccordion } from '../accordion/accordion';
import { Button } from '@sk-web-gui/button';
import { Label } from '@sk-web-gui/label';
import { Divider } from '@sk-web-gui/divider';
import { useDisclosureClass } from './styles';
import { Icon, IconProps } from '@sk-web-gui/icon';

export interface DisclosureProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
  initalOpen?: boolean;
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
  icon?: React.ComponentProps<IconProps>['name'];
  /** Support text. Will be displayed after the header. */
  supportText?: string;
  /** Label. Will be displayed after the header. */
  label?: string;
  /** Color of the label
   * @default gronsta
   */
  labelColor?: React.ComponentProps<typeof Label>['color'];
  /** Inverts the colors of the label
   * @default true
   */
  labelInverted?: React.ComponentProps<typeof Label>['inverted'];
}

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
    variant = 'default',
    icon,
    supportText,
    label,
    labelColor = 'gronsta',
    labelInverted = true,
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

  const classes = useDisclosureClass({ size, disabled, variant });
  return (
    <div
      ref={ref}
      className={cx(classes, disclosureOpen ? 'sk-disclosure-is-open' : undefined, className)}
      id={id}
      data-open={disclosureOpen}
      data-variant={variant}
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
          {icon && <Icon name={icon} size={size === 'lg' ? '3.2rem' : size === 'md' ? '2.4rem' : '2rem'} />}
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
            size={variant === 'default' ? size : 'sm'}
            className="sk-disclosure-header-icon"
            aria-controls={`${id}-content`}
            aria-expanded={disclosureOpen}
            aria-labelledby={`${id}-label`}
          >
            {disclosureOpen ? <Icon name="minus" /> : <Icon name="plus" />}
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
