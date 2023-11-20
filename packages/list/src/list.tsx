import { Link, LinkProps } from '@sk-web-gui/link';
import { cx, __DEV__, DefaultProps } from '@sk-web-gui/utils';
import * as React from 'react';

interface IListProps extends DefaultProps {
  /** Select style of list. */
  listStyle?: 'bullet' | 'numbered' | 'stroke';
  /** React Node */
  children?: React.ReactNode;
}

export interface ListProps extends React.HTMLAttributes<HTMLElement>, IListProps {}

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

interface IListItemProps extends DefaultProps {
  /* React Node */
  children?: React.ReactNode;
}

export interface ListItemProps extends React.HTMLAttributes<HTMLElement>, IListItemProps {}

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

export const ListLink = React.forwardRef<HTMLElement, LinkProps>((props, ref) => {
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

interface IListHeaderProps extends DefaultProps {
  /* React Node */
  children?: React.ReactNode;
}

export interface ListHeaderProps extends React.HTMLAttributes<HTMLElement>, IListHeaderProps {}

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

interface IListTextProps extends DefaultProps {
  /* React Node */
  children?: React.ReactNode;
}

export interface ListTextProps extends React.HTMLAttributes<HTMLElement>, IListTextProps {}

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
