import { cx } from '@sk-web-gui/utils';
import { Icon, IconProps } from './icon';

export const IconPadded = (props: IconProps) => {
  const { children, className, ...rest } = props;

  return (
    <Icon className={cx('sk-icon-padded', className)} {...rest}>
      {children}
    </Icon>
  );
};
