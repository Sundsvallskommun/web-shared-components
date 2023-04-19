import { cx, __DEV__, PolymorphicComponentPropsWithRef, PolymorphicRef } from '@sk-web-gui/utils';
import { DefaultProps } from '@sk-web-gui/utils';
import * as React from 'react';
import LaunchIcon from '@mui/icons-material/Launch';

export interface LinkProps extends DefaultProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /* Makes link disabled */
  disabled?: boolean;
  /* Makes link open in new tab */
  external?: boolean;
  /* The element or component to use in place of `a` */
  // as?: React.ElementType;
  // /* Action to perform when clicked */
  // onClick?: React.HTMLAttributes<HTMLAnchorElement>['onClick'];
  /* React node */
  children?: React.ReactNode;
  // /* href */
  // href?: React.HTMLAttributes<HTMLAnchorElement>['href'];
}

// export interface LinkProps extends ILinkProps, Omit<React.HTMLAttributes<HTMLAnchorElement>, 'as'> {}

type ILinkProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<C, LinkProps>;
// export type LinkProps = ILinkProps<'a'> & CommonProps;

// type LinkComponent = <C extends React.ElementType = 'a'>(props: ILinkProps<C>) => React.ReactElement | null;

export const Link = React.forwardRef(
  <C extends React.ElementType = 'a'>(props: ILinkProps<C>, ref?: PolymorphicRef<C>) => {
    const { disabled, external, onClick, className, as: Comp = 'a', children, ...rest } = props;
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
        {external && <LaunchIcon className="link-external-icon" />}
      </Comp>
    );
  }
);

// if (__DEV__) {
//   Link.displayName = 'Link';
// }

export default Link;
