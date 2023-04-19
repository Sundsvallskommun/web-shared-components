import { Spinner } from '@sk-web-gui/spinner';
import { DefaultProps, PolymorphicComponentPropsWithRef, PolymorphicRef } from '@sk-web-gui/utils';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import { Link } from '@sk-web-gui/link';
import { useButtonClass } from './styles';

export interface ButtonProps extends DefaultProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  /* Shows loading spinner */
  loading?: boolean;
  /* Makes button disabled */
  disabled?: boolean;
  /* Makes button active */
  active?: boolean;
  /* The label to show in the button when loading is true */
  loadingText?: string;
  /* Set the original html type of button */
  // type?: 'button' | 'reset' | 'submit';
  /* Adds icon before button label */
  leftIcon?: React.ReactElement;
  /* Adds icon after button label */
  rightIcon?: React.ReactElement;
  /* Set the button color */
  color?: string;
  /* Size of the button */
  size?: 'sm' | 'md' | 'lg' | 'fit';
  /** Controls button appearance */
  variant?: 'link' | 'solid' | 'outline' | 'light' | 'ghost';
  /* React node */
  children?: React.ReactNode;
  /* Sets the button to the rounded variant */
  rounded?: boolean;
  /* Sets if this is an icon button */
  iconButton?: boolean;
}

type IButtonProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<C, ButtonProps>;
// export type ButtonProps = CommonProps;
// interface ButtonProps extends CommonProps{}

// type ButtonComponent = <C extends React.ElementType = 'button'>(props: IButtonProps<C>) => React.ReactElement | null;

// export interface ButtonRegularProps extends CommonProps, React.HTMLAttributes<HTMLButtonElement> {
//   variant?: 'solid' | 'outline' | 'light' | 'ghost';
//   // ref?: React.RefObject<HTMLButtonElement>;
// }
// export interface ButtonLinkProps extends CommonProps, LinkProps {
//   variant: 'link';
//   // ref?: React.RefObject<HTMLLinkElement>;
// }

// // export type IButtonProps = CommonProps extends {variant: 'link'} ? ButtonLinkProps : ButtonRegularProps
// // export interface IButtonProps extends CommonProps<'link'> ? ButtonRegularProps : ButtonLinkProps {}

// export type IButtonProps = ButtonRegularProps | ButtonLinkProps;

// export interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement>, IButtonProps {}

// const isLink = (props: IButtonProps): props is ButtonLinkProps => {
//   return props.variant == 'link';
// };

export const getButtonContent = (props: ButtonProps): JSX.Element => {
  const { loading, loadingText, leftIcon, rightIcon, children } = props;
  return (
    <>
      {leftIcon && !loading ? <span className="btn-has-icon-left">{leftIcon}</span> : null}
      {loading && (
        <Spinner className={cx(loadingText ? 'relative' : 'absolute', loadingText ? `mr-2` : 'mr-0')} size="sm" />
      )}
      {loading ? loadingText || <span className="opacity-0">{children}</span> : children}
      {rightIcon && !loading ? <span className="btn-has-icon-right">{rightIcon}</span> : null}
    </>
  );
};

// type PolymorphicButton = {
//   (props: ButtonLinkProps): JSX.Element;
//   (props: ButtonRegularProps): JSX.Element;
// };

export const Button = React.forwardRef(
  <C extends React.ElementType = 'button'>(props: IButtonProps<C>, ref?: PolymorphicRef<C>) => {
    const {
      disabled: _disabled,
      loading,
      active,
      type,
      className,
      color,
      variant = 'outline',
      size = 'md',
      rounded = false,
      iconButton,
      as,
      ...rest
    } = props;
    const Component = as || 'button';

    const disabled = _disabled || loading;
    const classes = useButtonClass({
      variant,
      size,
      disabled,
    });

    return variant == 'link' ? (
      <Link
        as="button"
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled ? disabled : undefined}
        data-active={active ? 'true' : undefined}
        className={cx(className)}
        {...rest}
      >
        {getButtonContent(props)}
      </Link>
    ) : (
      <Component
        {...rest}
        ref={ref}
        disabled={disabled}
        aria-disabled={disabled ? disabled : undefined}
        type={type}
        data-rounded={rounded ? rounded : undefined}
        data-active={active ? 'true' : undefined}
        data-color={color ? color : undefined}
        data-icon={iconButton ? iconButton : undefined}
        className={cx(classes, className)}
      >
        {getButtonContent(props)}
      </Component>
    );
  }
);

if (__DEV__) {
  Button.displayName = 'Button';
}

export default Button;
