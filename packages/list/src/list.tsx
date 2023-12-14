import { Link, LinkProps } from '@sk-web-gui/link';
import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';
import React from 'react';

export interface ListProps extends DefaultProps, React.ComponentPropsWithRef<'ul'> {
  /** Select style of list. */
  listStyle?: 'bullet' | 'numbered' | 'stroke';
  /** React Node */
  children?: React.ReactNode;
}

export const List = React.forwardRef<HTMLUListElement, ListProps>((props, ref) => {
  const { children, className, listStyle = 'stroke', ...rest } = props;

  return (
    <ul ref={ref} data-style={listStyle ? listStyle : undefined} className={cx('sk-list', className)} {...rest}>
      {children}
    </ul>
  );
});

if (__DEV__) {
  List.displayName = 'List';
}

// NOTE: Body component

export interface ListItemProps extends DefaultProps, React.ComponentPropsWithRef<'li'> {
  /* React Node */
  children?: React.ReactNode;
}

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <li ref={ref} className={cx('sk-list-item', className)} {...rest}>
      {children}
    </li>
  );
});

if (__DEV__) {
  ListItem.displayName = 'ListItem';
}

// NOTE: Link component

export const ListLink = React.forwardRef<typeof Link, LinkProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <Link href="#" className={className} {...rest} ref={ref}>
      {children}
    </Link>
  );
});

if (__DEV__) {
  ListLink.displayName = 'ListItem';
}

// NOTE: Item component

export interface ListHeaderProps extends DefaultProps, React.ComponentPropsWithRef<'p'> {
  /* React Node */
  children?: React.ReactNode;
}

export const ListHeader = React.forwardRef<HTMLParagraphElement, ListHeaderProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <p ref={ref} className={cx('sk-list-header', className)} {...rest}>
      {children}
    </p>
  );
});

if (__DEV__) {
  ListHeader.displayName = 'ListHeader';
}

// NOTE: Text component

export interface ListTextProps extends DefaultProps, React.ComponentPropsWithRef<'p'> {
  /* React Node */
  children?: React.ReactNode;
}

export const ListText = React.forwardRef<HTMLParagraphElement, ListTextProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <p ref={ref} className={cx('sk-list-text', className)} {...rest}>
      {children}
    </p>
  );
});

if (__DEV__) {
  ListText.displayName = 'ListText';
}

export default List;
