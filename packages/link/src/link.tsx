import { cx, __DEV__, PolymorphicComponentPropsWithRef, PolymorphicRef } from '@sk-web-gui/utils';
import { DefaultProps } from '@sk-web-gui/utils';
import * as React from 'react';
import LaunchIcon from '@mui/icons-material/Launch';

export interface LinkProps extends DefaultProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /* Makes link disabled */
  disabled?: boolean;
  /* Makes link open in new tab */
  external?: boolean;
  /* React node */
  children?: React.ReactNode;
  hideExternalIcon?: boolean;
}

type ILinkProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<C, LinkProps>;

export const Link = React.forwardRef(
  <C extends React.ElementType = 'a'>(props: ILinkProps<C>, ref?: PolymorphicRef<C>) => {
    const {
      disabled,
      external,
      onClick,
      className,
      as: Comp = 'a',
      children,
      hideExternalIcon = false,
      ...rest
    } = props;
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : null;

    return (
      <Comp
        ref={ref}
        tabIndex={disabled ? -1 : undefined}
        aria-disabled={disabled}
        onClick={disabled ? (event: React.MouseEvent<HTMLAnchorElement>) => event.preventDefault() : onClick}
        className={cx('link', disabled && 'link-disabled', className)}
        {...externalProps}
        {...rest}
      >
        {children}
        {!hideExternalIcon && external && <LaunchIcon className="link-external-icon" />}
      </Comp>
    );
  }
);

if (__DEV__) {
  Link.displayName = 'Link';
}

export default Link;
