import { cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';
import { DisclosureHeaderIcon } from './disclosure-header-icon';
import { useDisclosureHeaderClass } from './styles';
import { useDisclosure } from './use-disclosure';
import { DisclosureDefualtProps } from './disclosure';
import { DisclosureHeaderContext } from './disclosure-context';

export interface DisclosureHeaderProps
  extends React.ComponentPropsWithRef<'div'>,
    Omit<DisclosureDefualtProps, 'open'> {}

export const DisclosureHeader = React.forwardRef<HTMLDivElement, DisclosureHeaderProps>((props, ref) => {
  const {
    disabled: propsDisabled,
    className,
    size: propsSize,
    variant: propsVariant,
    inverted: propsInverted,
    id: propsId,
    ...rest
  } = props;
  const {
    size: contextSize,
    variant: contextVariant,
    id: contextId,
    setHasLeadingIcon,
    toggleOpen,
    disabled: contextDisabled,
    inverted: contextInverted,
  } = useDisclosure();
  const size = propsSize ?? contextSize ?? 'md';
  const variant = propsVariant ?? contextVariant ?? 'default';
  const id = propsId ?? `${contextId}-header`;
  const disabled = propsDisabled ?? contextDisabled;
  const inverted = propsInverted ?? contextInverted;
  const classes = useDisclosureHeaderClass({ size, disabled, variant });

  setHasLeadingIcon?.(getValidChildren(props.children)[0].type === DisclosureHeaderIcon);

  const context = {
    id,
    size,
    variant,
    disabled,
    inverted,
  };

  return (
    <DisclosureHeaderContext.Provider value={context}>
      <div
        ref={ref}
        id={id ?? `${contextId}-header`}
        className={cx(classes, className)}
        aria-disabled={disabled ? disabled : undefined}
        data-variant={variant}
        data-inverted={inverted ? 'true' : undefined}
        onClick={toggleOpen}
        {...rest}
      />
    </DisclosureHeaderContext.Provider>
  );
});
