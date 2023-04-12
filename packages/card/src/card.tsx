// import { Spinner } from "@sk-web-gui/spinner";
import { DefaultProps } from '@sk-web-gui/theme';
import { Link, LinkProps } from '@sk-web-gui/link';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';

// import { useCardClass } from "./styles";

interface ICardProps extends DefaultProps {
  clickable?: boolean;
  outlined?: boolean;
  borderTop?: boolean;
  /* The element or component to use in place of `a` */
  as?: React.ElementType;
  /* React node */
  children?: React.ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, ICardProps {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    children,
    className,
    color,
    borderTop = false,
    outlined = false,
    clickable = false,
    as: Comp = 'div',
    ...rest
  } = props;

  return (
    <Comp
      data-color={color ? color : undefined}
      className={cx(
        'card',
        { 'card-outlined': outlined },
        { 'card-border-top': borderTop },
        { 'card-clickable': clickable },
        className
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </Comp>
  );
});

if (__DEV__) {
  Card.displayName = 'Card';
}

// NOTE: Card List component

interface ICardListProps extends DefaultProps {
  /* The element or component to use in place of `a` */
  as?: React.ElementType;
  /* React node */
  children?: React.ReactNode;
}

export interface CardListProps extends React.HTMLAttributes<HTMLDivElement>, ICardListProps {}

export const CardList = React.forwardRef<HTMLDivElement, CardListProps>((props, ref) => {
  const { children, className, color, as: Comp = 'div', ...rest } = props;

  return (
    <Comp data-color={color ? color : undefined} className={cx('card-list', className)} ref={ref} {...rest}>
      {children}
    </Comp>
  );
});

if (__DEV__) {
  CardList.displayName = 'CardList';
}

// NOTE: Card body component

interface ICardBodyProps extends DefaultProps {
  /* The element or component to use in place of `a` */
  as?: React.ElementType;
  /* React node */
  children?: React.ReactNode;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement>, ICardBodyProps {}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>((props, ref) => {
  const { children, className, color, as: Comp = 'div', ...rest } = props;

  return (
    <Comp data-color={color ? color : undefined} className={cx('card-body', className)} ref={ref} {...rest}>
      {children}
    </Comp>
  );
});

if (__DEV__) {
  CardBody.displayName = 'CardBody';
}

// NOTE: Card image component

interface ICardImageProps extends DefaultProps {
  /* The element or component to use in place of `a` */
  as?: React.ElementType;
  /* React node */
  children?: React.ReactNode;
  /* The image `src` attribute */
  src?: string;
  /* The alt text for the image */
  alt?: string;
}

export interface CardImageProps extends React.HTMLAttributes<HTMLImageElement>, ICardImageProps {}

export const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>((props, ref) => {
  const { children, className, color, as: Comp = 'img', ...rest } = props;

  return (
    <Comp data-color={color ? color : undefined} className={cx('card-image', className)} ref={ref} {...rest}>
      {children}
    </Comp>
  );
});

if (__DEV__) {
  CardImage.displayName = 'CardImage';
}

// NOTE: Card link component

export const CardLink = React.forwardRef<HTMLLinkElement, LinkProps>((props, ref) => {
  const { children, external, className, ...rest } = props;

  return (
    <Link className={cx('card-link', { 'card-link-external': external }, className)} ref={ref} {...rest}>
      {children}
    </Link>
  );
});

if (__DEV__) {
  CardLink.displayName = 'CardLink';
}
