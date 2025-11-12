import Button, { ButtonProps } from '@sk-web-gui/button';
import Icon from '@sk-web-gui/icon';
import { cx } from '@sk-web-gui/utils';
import { Minus, Plus } from 'lucide-react';
import React, { ComponentPropsWithRef } from 'react';
import { DisclosureDefualtProps } from './disclosure';
import { useDisclosure, useDisclosureHeader } from './use-disclosure';

export interface DisclosureHeaderButtonProps
  extends Omit<ComponentPropsWithRef<ButtonProps['Component']>, 'variant' | 'children'>,
    Pick<DisclosureDefualtProps, 'variant' | 'open'> {
  children?: (open: boolean) => React.ReactNode | React.ReactNode;
}

export const DisclosureHeaderButton = React.forwardRef<HTMLButtonElement, DisclosureHeaderButtonProps>((props, ref) => {
  const {
    variant: propsVariant,
    size: propsSize,
    children: _children,
    className,
    open: propsOpen,
    inverted: propsInverted,
    disabled: propsDisabled,
    ...rest
  } = props;
  const {
    variant: contextVariant,
    open: contextOpen,
    size: contextSize,
    id: contextId,
    toggleOpen,
    inverted: contextInverted,
    disabled: contextDisabled,
  } = useDisclosure();
  const {
    variant: headerContextVariant,
    size: headerContextSize,
    id: headerContextId,
    inverted: headerContextInverted,
    disabled: headerContextDisabled,
  } = useDisclosureHeader();
  const open = propsOpen ?? contextOpen;
  const size = propsSize ?? headerContextSize ?? contextSize ?? 'md';
  const variant = propsVariant ?? headerContextVariant ?? contextVariant ?? 'default';
  const inverted = propsInverted ?? headerContextInverted ?? contextInverted;
  const disabled = propsDisabled ?? headerContextDisabled ?? contextDisabled;
  const children = typeof _children === 'function' ? _children(open) : _children;

  return (
    <Button
      inverted={inverted}
      variant={variant === 'default' ? 'ghost' : 'tertiary'}
      className={cx('sk-disclosure-header-button', className)}
      iconButton
      disabled={disabled}
      size={variant === 'default' ? size : 'sm'}
      ref={ref}
      onClick={toggleOpen}
      aria-controls={contextId ? `${contextId}-content` : undefined}
      aria-labelledby={headerContextId ? `${headerContextId}-label` : undefined}
      aria-expanded={open}
      {...rest}
    >
      {children ?? <Icon icon={open ? <Minus /> : <Plus />} />}
    </Button>
  );
});
