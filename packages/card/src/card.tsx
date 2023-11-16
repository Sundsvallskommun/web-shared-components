import { DefaultProps } from '@sk-web-gui/utils';
import { Link, LinkProps } from '@sk-web-gui/link';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import { Icon } from '@sk-web-gui/icon';
import * as React from 'react';

// NOTE: Card component

interface ICardProps extends DefaultProps {
  /** If the card should be clickable, will apply :hover style */
  clickable?: boolean;
  /** React node */
  children?: React.ReactNode;
  /** Set background color to card */
  color?: 'mono' | 'vattjom' | 'gronsta' | 'bjornstigen' | 'juniskar';
  /** false */
  inverted?: boolean;
  /** vertical */
  layout?: 'vertical' | 'horizontal';
}

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>, ICardProps {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    children,
    className,
    color = 'vattjom',
    inverted = false,
    clickable = false,
    layout = 'vertical',
    ...rest
  } = props;
  return (
    <div
      data-color={color ? color : undefined}
      data-inverted={inverted ? inverted : undefined}
      data-layout={layout ? layout : undefined}
      className={cx('sk-card', { 'sk-card-clickable': clickable }, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  );
});

if (__DEV__) {
  Card.displayName = 'Card';
}

// NOTE: Card List component

interface ICardListProps extends DefaultProps {
  /** The element or component to use in place of `a` */
  as?: React.ElementType;
  /** React Node */
  children?: React.ReactNode;
}

export interface CardListProps extends React.HTMLAttributes<HTMLDivElement>, ICardListProps {}

export const CardList = React.forwardRef<HTMLDivElement, CardListProps>((props, ref) => {
  const { children, className, color, as: Comp = 'div', ...rest } = props;

  return (
    <Comp data-color={color ? color : undefined} className={cx('sk-card-list', className)} ref={ref} {...rest}>
      {children}
    </Comp>
  );
});

if (__DEV__) {
  CardList.displayName = 'CardList';
}

// NOTE: Card image component

interface ICardImageProps extends DefaultProps {
  /** The element or component to use in place of `a` */
  as?: React.ElementType;
  /** React node */
  children?: React.ReactNode;
  /** The image `src` attribute */
  src?: string;
  /** The alt text for the image */
  alt?: string;
}

export interface CardImageProps extends React.HTMLAttributes<HTMLImageElement>, ICardImageProps {}

export const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>((props, ref) => {
  const { children, className, color, as: Comp = 'img', ...rest } = props;

  return (
    <Comp data-color={color ? color : undefined} className={cx('sk-card-image', className)} ref={ref} {...rest}>
      {children}
    </Comp>
  );
});

if (__DEV__) {
  CardImage.displayName = 'CardImage';
}

// NOTE: Card Header component

interface ICardHeaderProps extends DefaultProps {
  /** React node */
  children?: React.ReactNode;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement>, ICardHeaderProps {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <div className={cx('sk-card-body-header', className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});

// NOTE: Card body component

interface ICardBodyProps extends DefaultProps {
  /** The element or component to use in place of `a` */
  as?: React.ElementType;
  /** React node */
  children?: React.ReactNode;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement>, ICardBodyProps {}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>((props, ref) => {
  const { children, className, color, as: Comp = 'div', ...rest } = props;
  return (
    <Comp data-color={color ? color : undefined} className={cx('sk-card-body', className)} ref={ref} {...rest}>
      {children}
    </Comp>
  );
});

if (__DEV__) {
  CardBody.displayName = 'CardBody';
}

// NOTE: Card Meta component

interface ICardMetaProps extends DefaultProps {
  /** The element or component to use in place of `a` */
  as?: React.ElementType;
  /** The date as string */
  date?: string;
  /** The time as string */
  time?: string;
}

export interface CardMetaProps extends React.HTMLAttributes<HTMLDivElement>, ICardMetaProps {}

export const CardMeta = React.forwardRef<HTMLDivElement, CardMetaProps>((props, ref) => {
  const { className, date = '29 augsit 2023', time = '11:51', as: Comp = 'div', ...rest } = props;
  return (
    <Comp className={cx('sk-card-meta', className)} ref={ref} {...rest}>
      <Icon name="calendar" variant="ghost" />
      {date}

      <Icon name="clock-4" variant="ghost" />
      {time}
    </Comp>
  );
});

if (__DEV__) {
  CardMeta.displayName = 'CardBody';
}

// NOTE: Card Preamble component

interface ICardPreambleProps extends DefaultProps {
  /** The element or component to use in place of `a` */
  as?: React.ElementType;
  /** React node */
  children?: React.ReactNode;
}

export interface CardPreambleProps extends React.HTMLAttributes<HTMLDivElement>, ICardPreambleProps {}

export const CardPreamble = React.forwardRef<HTMLDivElement, CardPreambleProps>((props, ref) => {
  const { children, className, color, as: Comp = 'div', ...rest } = props;

  return (
    <div className="sk-card-body-wrapper">
      <Comp
        data-color={color ? color : undefined}
        className={cx('sk-card-body-content', className)}
        ref={ref}
        {...rest}
      >
        {children}
      </Comp>
      <Icon name="arrow-right" size={40} rounded className="sk-card-body-icon" />
    </div>
  );
});

if (__DEV__) {
  CardPreamble.displayName = 'CardBody';
}

export const CardLink = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { children, external, className, ...rest } = props;

  return (
    <Link className={cx('sk-card-link', { 'sk-card-link-external': external }, className)} ref={ref} {...rest}>
      {children}
    </Link>
  );
});

if (__DEV__) {
  CardLink.displayName = 'CardLink';
}

export default Card;
