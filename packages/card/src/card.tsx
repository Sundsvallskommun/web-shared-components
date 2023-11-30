import { DefaultProps } from '@sk-web-gui/utils';
import { Link } from '@sk-web-gui/link';
import { cx, getValidChildren, __DEV__ } from '@sk-web-gui/utils';
import { Icon } from '@sk-web-gui/icon';
import { Button } from '@sk-web-gui/button';
import * as React from 'react';

import { cloneElement } from 'react';

// NOTE: Card component

interface ICardProps extends DefaultProps {
  /** React node */
  children?: React.ReactNode;
  /** Set background color to card
   * @default vattjom
   */
  color?: 'mono' | 'tertiary' | 'vattjom' | 'gronsta' | 'bjornstigen' | 'juniskar';
  /** Make the card inverted
   * @default false
   */
  invert?: boolean;
  /** Change layout of card
   * @default 'vertical'
   */
  layout?: 'vertical' | 'horizontal';
  /** If the card should be clickable, will apply hover style
   * @default false;
   */
  useHoverEffect?: boolean;
  /** Make the card linkable
   */
  href?: string;
}

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>, ICardProps {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    children,
    className,
    color = 'vattjom',
    invert = false,
    layout = 'vertical',
    useHoverEffect = false,
    href = '',
    ...rest
  } = props;
  let inverted = invert.toString();

  const validChildren = getValidChildren(children);
  const clones = validChildren.map((child, index) => {
    return cloneElement(child, {
      color,
      inverted,
    });
  });

  if (href !== '') {
    return (
      <Link
        href={href}
        data-color={color ? color : undefined}
        data-inverted={invert ? invert : undefined}
        data-layout={layout ? layout : undefined}
        className={cx('sk-card', { 'sk-card-use-hover-effect': useHoverEffect }, className)}
        {...rest}
        ref={ref}
      >
        {clones}
      </Link>
    );
  } else {
    return (
      <div
        data-color={color ? color : undefined}
        data-inverted={invert ? invert : undefined}
        data-layout={layout ? layout : undefined}
        className={cx('sk-card', { 'sk-card-use-hover-effect': useHoverEffect }, className)}
        {...rest}
        ref={ref}
      >
        {clones}
      </div>
    );
  }
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
  /** React node */
  children?: React.ReactNode;
  /** The image `src` attribute */
  src?: string;
  /** The alt text for the image */
  alt?: string;
  /** Make the card inverted */
  inverted?: string;
}

export interface CardImageProps extends React.HTMLAttributes<HTMLImageElement>, ICardImageProps {}

export const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>((props, ref) => {
  const { children, className, color, inverted, ...rest } = props;

  return (
    <img data-color={color ? color : undefined} className={cx('sk-card-image', className)} ref={ref} {...rest}>
      {children}
    </img>
  );
});

if (__DEV__) {
  CardImage.displayName = 'CardImage';
}

// NOTE: Card Header component

interface ICardHeaderProps extends DefaultProps {
  /** React node */
  children?: React.ReactNode;
  /** Make the card inverted */
  inverted?: string;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement>, ICardHeaderProps {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>((props, ref) => {
  const { children, className, inverted, color, ...rest } = props;
  return (
    <div className={cx('sk-card-body-header', className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});

// NOTE: Card body component

interface ICardBodyProps extends DefaultProps {
  /** React node */
  children?: React.ReactNode;
  /** Make the card inverted */
  inverted?: string;
}

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement>, ICardBodyProps {}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>((props, ref) => {
  const { children, className, color, inverted, ...rest } = props;

  const validChildren = getValidChildren(children);
  const clones = validChildren.map((child, index) => {
    return cloneElement(child, {
      color,
      inverted,
    });
  });

  return (
    <div data-color={color ? color : undefined} className={cx('sk-card-body', className)} ref={ref} {...rest}>
      {clones}
    </div>
  );
});

if (__DEV__) {
  CardBody.displayName = 'CardBody';
}

// NOTE: Card Meta component

interface ICardMetaProps extends DefaultProps {
  /** Insert date object and it will apply date and time to the card */
  datetime?: Date;
  /** Make the card inverted */
  inverted?: string;
}

export interface CardMetaProps extends React.HTMLAttributes<HTMLDivElement>, ICardMetaProps {}

export const CardMeta = React.forwardRef<HTMLDivElement, CardMetaProps>((props, ref) => {
  const { className, datetime, color, inverted, ...rest } = props;
  const monthNames = [
    'januari',
    'februari',
    'mars',
    'april',
    'maj',
    'juni',
    'juli',
    'augusti',
    'september',
    'oktober',
    'november',
    'december',
  ];

  return (
    <div className={cx('sk-card-body-meta', className)} ref={ref} {...rest}>
      <span>
        <Icon name="calendar" variant="ghost" />
        <time dateTime={datetime?.toISOString().split('T')[0]}>
          {datetime?.getDay() as any} {monthNames[datetime?.getMonth() as any]} {datetime?.getFullYear() as any}
        </time>
      </span>
      <span>
        <Icon name="clock-4" variant="ghost" />
        <time dateTime={datetime?.getHours() + ':' + datetime?.getMinutes()}>
          {datetime?.getHours() as any}:{('0' + datetime?.getMinutes()).slice(-2) as any}
        </time>
      </span>
    </div>
  );
});

if (__DEV__) {
  CardMeta.displayName = 'CardMeta';
}

// NOTE: Card Text component

interface ICardTextProps extends DefaultProps {
  /** React node */
  children?: React.ReactNode;
  /** Make the card inverted */
  inverted?: string;
}

export interface CardTextProps extends React.HTMLAttributes<HTMLDivElement>, ICardTextProps {}

export const CardText = React.forwardRef<HTMLDivElement, CardTextProps>((props, ref) => {
  const { children, className, inverted, color, ...rest } = props;

  return (
    <div className="sk-card-body-wrapper">
      <div data-color={color ? color : undefined} className={cx('sk-card-body-content', className)} ref={ref} {...rest}>
        {children}
      </div>
      <Button
        as={'div'}
        iconButton
        color={color as any}
        rounded
        inverted={inverted == 'true' ? false : true}
        className="sk-card-body-icon"
      >
        <Icon name="arrow-right" size={20} />
      </Button>
    </div>
  );
});

if (__DEV__) {
  CardText.displayName = 'CardText';
}

export default Card;
