import Icon, { IconProps } from '@sk-web-gui/icon';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { DisclosureDefualtProps } from './disclosure';
import { useDisclosureHeaderIconClass } from './styles';
import { useDisclosure } from './use-disclosure';

export type DisclosureHeaderIconProps = Omit<React.ComponentPropsWithRef<IconProps['Component']>, 'size'> &
  Omit<DisclosureDefualtProps, 'open'>;

export const DisclosureHeaderIcon = React.forwardRef<HTMLSpanElement, DisclosureHeaderIconProps>((props, ref) => {
  const { className, size, variant, disabled, inverted: propsInverted, ...rest } = props;
  const { inverted: contextInverted } = useDisclosure();
  const classes = useDisclosureHeaderIconClass({ size, variant, disabled });
  const inverted = propsInverted ?? contextInverted;

  return <Icon ref={ref} inverted={inverted} className={cx(classes, className)} {...rest} />;
});
