import { Icon } from '@sk-web-gui/icon';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface BubbleProps extends React.ComponentPropsWithoutRef<'button'> {
  /**
   * @default vattjom
   */
  color?: string;
  /**
   * @default false
   */
  inverted?: boolean;
  /**
   * Variant.
   * default or simple (without extra decoration)
   * @default default
   */
  variant?: 'default' | 'simple';
  /**
   * @default false
   */
  hideIcon?: boolean;
  /**
   * Trailing icon.
   * @default <ArrowRight/>
   */
  icon?: React.ReactElement;
  /**
   * @default true
   */
  shadow?: boolean;
}

export const Bubble = React.forwardRef<HTMLButtonElement, BubbleProps>((props, ref) => {
  const {
    className,
    children,
    color = 'vattjom',
    inverted,
    hideIcon = false,
    icon = <ArrowRight />,
    variant = 'default',
    shadow = true,
    ...rest
  } = props;

  return (
    <button
      ref={ref}
      className={cx('sk-ai-bubble', className)}
      data-inverted={inverted}
      data-variant={variant}
      data-color={color}
      data-shadow={shadow}
      {...rest}
    >
      {children}
      {!hideIcon && (icon?.type === Icon ? icon : <Icon icon={icon} size={18} />)}
      {variant === 'default' && <span className="sk-ai-bubble-tail" />}
    </button>
  );
});
