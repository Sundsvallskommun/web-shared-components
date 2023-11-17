import { Link, LinkProps } from '@sk-web-gui/link';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import { DefaultProps } from '@sk-web-gui/utils';
import * as React from 'react';

interface IListProps extends DefaultProps {
  /** Select style of list. */
  listStyle?: 'bullet' | 'numbered' | 'stroke';
  /** React Node */
  children?: React.ReactNode;
}

export interface ListProps extends React.HTMLAttributes<HTMLElement>, IListProps {}

export const List = React.forwardRef<HTMLElement, ListProps>((props, ref) => {
  const { children, className, listStyle = 'stroke', ...rest } = props;

  return (
    <ul data-style={listStyle ? listStyle : undefined} className={cx('sk-list')} {...rest}>
      {children}
    </ul>
  );
});

if (__DEV__) {
  List.displayName = 'List';
}

// NOTE: Body component

interface IListBodyProps extends DefaultProps {
  /* React Node */
  children?: React.ReactNode;
}

export interface ListBodyProps extends React.HTMLAttributes<HTMLElement>, IListBodyProps {}

export const ListBody = React.forwardRef<HTMLElement, ListBodyProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <li className={cx('sk-list-body')} {...rest}>
      {children}
    </li>
  );
});

if (__DEV__) {
  ListBody.displayName = 'ListBody';
}

// NOTE: Link component

export const ListLink = React.forwardRef<HTMLElement, LinkProps>((props, ref) => {
  const { children, external, className, ...rest } = props;

  return (
    <Link external href="#">
      {children}
    </Link>
  );
});

if (__DEV__) {
  ListLink.displayName = 'ListItem';
}

// NOTE: Item component

interface IListItemProps extends DefaultProps {
  /* React Node */
  children?: React.ReactNode;
}

export interface ListItemProps extends React.HTMLAttributes<HTMLElement>, IListItemProps {}

export const ListItem = React.forwardRef<HTMLElement, ListItemProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <p className={cx('sk-list-item')} {...rest}>
      {children}
    </p>
  );
});

if (__DEV__) {
  ListItem.displayName = 'ListItem';
}

// NOTE: Text component

interface IListTextProps extends DefaultProps {
  /* React Node */
  children?: React.ReactNode;
}

export interface ListTextProps extends React.HTMLAttributes<HTMLElement>, IListTextProps {}

export const ListText = React.forwardRef<HTMLElement, ListTextProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <p className={cx('sk-list-text')} {...rest}>
      {children}
    </p>
  );
});

if (__DEV__) {
  ListText.displayName = 'ListText';
}

export default List;
