import Divider from '@sk-web-gui/divider';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { useDisclosureHeaderTitleClass } from './styles';
import { useDisclosure, useDisclosureHeader } from './use-disclosure';
import { DisclosureDefualtProps } from './disclosure';

export interface DisclosureHeaderTitleProps
  extends Omit<DisclosureDefualtProps, 'open'>,
    React.ComponentPropsWithRef<'div'> {}

export const DisclosureHeaderTitle = React.forwardRef<HTMLDivElement, DisclosureHeaderTitleProps>((props, ref) => {
  const {
    size: propsSize,
    variant: propsVariant,
    inverted: propsInverted,
    disabled: propsDisabled,
    className,
    id,
    children,
    ...rest
  } = props;
  const {
    variant: contextVariant,
    size: contextSize,
    inverted: contextInverted,
    disabled: contextDisabled,
  } = useDisclosure();
  const {
    id: headerContextId,
    variant: headerContextVariant,
    size: headerContextSize,
    inverted: headerContextInverted,
    disabled: headerContextDisabled,
  } = useDisclosureHeader();
  const variant = propsVariant ?? headerContextVariant ?? contextVariant;
  const size = propsSize ?? headerContextSize ?? contextSize ?? 'md';
  const inverted = propsInverted ?? headerContextInverted ?? contextInverted;
  const disabled = propsDisabled ?? headerContextDisabled ?? contextDisabled;

  const classes = useDisclosureHeaderTitleClass({ size, variant, disabled });
  return (
    <div
      ref={ref}
      className={cx(classes, className)}
      id={id ?? `${headerContextId}-title`}
      data-variant={variant}
      data-inverted={inverted ? 'true' : undefined}
      {...rest}
    >
      {children}
      {variant === 'alt' && <Divider className="sk-disclosure-header-title-divider" data-inverted={inverted} />}
    </div>
  );
});
