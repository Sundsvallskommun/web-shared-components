import { Link, LinkProps } from '@sk-web-gui/link';
import { cx, getValidChildren, __DEV__, PolymorphicComponentPropsWithRef, PolymorphicRef } from '@sk-web-gui/utils';
import { DefaultProps } from '@sk-web-gui/utils';
import React from 'react';
import { cloneElement } from 'react';

export interface BreadcrumbSeparatorProps extends DefaultProps, React.ComponentPropsWithRef<'span'> {
  children?: React.ReactNode;
}

export const BreadcrumbSeparator = React.forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  ({ className, ...props }, ref) => {
    return <span ref={ref} role="presentation" className={cx('sk-breadcrumb-separator', className)} {...props} />;
  }
);

if (__DEV__) {
  BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
}

interface BreadcrumbLinkProps extends LinkProps {
  /**
   * If `true`, indicates that the breadcrumb item is active, adds
   * `aria-current=page` and renders a `span`
   */
  currentPage?: boolean;
}

export type IBreadcrumbLinkProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<
  C,
  BreadcrumbLinkProps
>;

export type { BreadcrumbLinkProps };

export const BreadcrumbLink = React.forwardRef(
  <C extends React.ElementType = typeof Link>(
    { currentPage, ...props }: IBreadcrumbLinkProps<C>,
    ref?: PolymorphicRef<C>
  ) => {
    const Comp = currentPage ? 'span' : Link;
    return <Comp ref={ref} aria-current={currentPage ? 'page' : undefined} {...props} />;
  }
);

if (__DEV__) {
  BreadcrumbLink.displayName = 'BreadcrumbLink';
}

interface IBreadcrumbProps extends DefaultProps {
  /** @default / */
  separator?: string | React.ReactElement;

  /** @default true */
  addSeparator?: boolean;

  /** @default primary */
  color?: 'primary' | 'vattjom';

  /** React Node */
  children?: React.ReactNode;
}

export interface BreadcrumbProps extends Omit<React.ComponentPropsWithRef<'nav'>, 'color'>, IBreadcrumbProps {}

export const Breadcrumb = React.forwardRef<HTMLDivElement, BreadcrumbProps>((props, ref) => {
  const { children, addSeparator = true, separator = '/', color = 'primary', className, ...rest } = props;
  const validChildren = getValidChildren(children);
  const clones = validChildren.map((child, index) => {
    if (React.isValidElement<BreadcrumbItemProps>(child)) {
      return cloneElement<BreadcrumbItemProps>(child, {
        addSeparator,
        separator,
        color,
        lastChild: validChildren.length === index + 1,
      });
    } else return child;
  });

  return (
    <nav ref={ref} aria-label="breadcrumb" className={cx('sk-breadcrumb', className)} {...rest}>
      <ol>{clones}</ol>
    </nav>
  );
});

if (__DEV__) {
  Breadcrumb.displayName = 'Breadcrumb';
}

export default Breadcrumb;

export interface BreadcrumbItemProps extends IBreadcrumbProps, Omit<React.ComponentPropsWithRef<'li'>, 'color'> {
  /**
   * If `true`, indicates that the breadcrumb item is active, adds
   * `aria-current=page` and renders a `span`
   */
  currentPage?: boolean;
  lastChild?: boolean;
}

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>((props, ref) => {
  const { currentPage, separator = '/', addSeparator = true, lastChild, children, color, className, ...rest } = props;
  const validChildren = getValidChildren(children);
  const clones = validChildren.map((child) => {
    if (child.type === BreadcrumbLink && React.isValidElement<BreadcrumbLinkProps>(child)) {
      return cloneElement<BreadcrumbLinkProps>(child, { currentPage });
    }

    if (child.type === BreadcrumbSeparator && React.isValidElement<BreadcrumbSeparatorProps>(child)) {
      return cloneElement<BreadcrumbSeparatorProps>(child, {
        children: child.props.children || separator,
      });
    }

    return child;
  });

  return (
    <li ref={ref} className={cx('sk-breadcrumb-item', className)} {...rest} data-color={color ? color : undefined}>
      {clones}
      {!lastChild && addSeparator && <BreadcrumbSeparator children={separator} />}
    </li>
  );
});
