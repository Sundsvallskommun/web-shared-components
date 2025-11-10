import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { DisclosureDefualtProps } from './disclosure';
import { useDisclosure, UseDisclosureProps } from './use-disclosure';

export interface DisclosureContentProps
  extends React.ComponentPropsWithRef<'div'>,
    DisclosureDefualtProps,
    Pick<UseDisclosureProps, 'hasLeadingIcon'> {}

export const DisclosureContent = React.forwardRef<HTMLDivElement, DisclosureContentProps>((props, ref) => {
  const { variant: propsVariant, open: propsOpen, hasLeadingIcon, size: propsSize, className, ...rest } = props;
  const {
    hasLeadingIcon: contextHasLeadingIcon,
    variant: contextVariant,
    size: contextSize,
    open: contextOpen,
    id,
  } = useDisclosure();
  const variant = propsVariant ?? contextVariant ?? 'default';
  const size = propsSize ?? contextSize ?? 'md';
  const open = propsOpen ?? contextOpen;

  return (
    <div
      ref={ref}
      className={cx('sk-disclosure-body', className)}
      data-has-icon={hasLeadingIcon ?? contextHasLeadingIcon}
      data-variant={variant}
      data-size={size === 'lg' && variant === 'default' ? 'md' : size}
      aria-hidden={!open}
      role="region"
      aria-labelledby={`${id}-header`}
      id={`${id}-content`}
      {...rest}
    />
  );
});
