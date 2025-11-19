import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';
import { useAccordion } from '../accordion/use-accordion';
import { DisclosureContext } from './disclosure-context';
import { useDisclosureClass } from './styles';
import { UseDisclosureProps } from './use-disclosure';

export interface DisclosureDefualtProps extends Pick<React.ComponentPropsWithRef<'div'>, 'id'> {
  /**
   * Control open state externally
   * @default undefined
   */
  open?: boolean;
  /**
   * Size of the disclosure
   * @default md
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Style variant,
   */
  variant?: 'default' | 'alt';
  /** Makes disclosure disabled */
  disabled?: boolean;
  /**
   * Inverted colors (light mode as dark mode colors and vice versa)
   * @default false
   */
  inverted?: boolean;
}
export interface DisclosureInternalProps
  extends DefaultProps,
    DisclosureDefualtProps,
    React.ComponentPropsWithRef<'div'> {
  /**
   * Open disclosure from start
   * @default false
   */
  initalOpen?: boolean;

  /* Returns true if opened, false if closed */
  onToggleOpen?: (open: boolean) => void;
}

export const DisclosureComponent = React.forwardRef<HTMLDivElement, DisclosureInternalProps>((props, ref) => {
  const {
    disabled,
    initalOpen = false,
    open: propsOpen = undefined,
    children,
    className,
    inverted,
    id: _id,
    onToggleOpen,
    size: _size,
    variant = 'default',
    ...rest
  } = props;
  const { onClose, onOpen, ...accordionContext } = useAccordion();
  const size = _size || accordionContext.size || 'md';
  const _open = accordionContext.open;
  const [disclosureOpen, setDisclosureOpen] = React.useState(initalOpen ?? propsOpen ?? false);
  const autoId = React.useId();
  const id = _id || `sk-disclosure-${autoId}`;
  const open = propsOpen ?? disclosureOpen;
  const [hasLeadingIcon, setHasLeadingIcon] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (onClose && onOpen) {
      if (_open?.includes(id)) {
        setDisclosureOpen(true);
        onToggleOpen?.(true);
      }
      if (!_open?.includes(id)) {
        setDisclosureOpen(false);
        onToggleOpen?.(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_open]);

  const onClick = () => {
    if (!disabled) {
      if (open) {
        onClose?.(id);
        onToggleOpen?.(false);
      } else {
        onOpen?.(id);
        onToggleOpen?.(true);
      }

      setDisclosureOpen(!disclosureOpen);
    }
  };

  const context: UseDisclosureProps = {
    open,
    toggleOpen: onClick,
    size,
    variant,
    id,
    hasLeadingIcon,
    setHasLeadingIcon,
    inverted,
    disabled,
  };

  const classes = useDisclosureClass({ size, disabled, variant });
  return (
    <DisclosureContext.Provider value={context}>
      <div
        ref={ref}
        className={cx(classes, disclosureOpen ? 'sk-disclosure-is-open' : undefined, className)}
        id={id}
        data-open={disclosureOpen}
        data-variant={variant}
        data-inverted={inverted}
        {...rest}
      >
        {children}
      </div>
    </DisclosureContext.Provider>
  );
});

if (__DEV__) {
  DisclosureComponent.displayName = 'Disclosure';
}

export default DisclosureComponent;
