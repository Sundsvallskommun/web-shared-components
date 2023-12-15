import { DefaultProps } from '@sk-web-gui/utils';
import { Link } from '@sk-web-gui/link';
import { cx, getValidChildren, __DEV__ } from '@sk-web-gui/utils';
import { Icon } from '@sk-web-gui/icon';
import { Button } from '@sk-web-gui/button';
import React from 'react';

import { cloneElement } from 'react';

// NOTE: Card component

export interface CardProps extends DefaultProps, Omit<React.ComponentPropsWithRef<'div'>, 'color'> {
  /** React node */
  children?: React.ReactNode;
  /** Set background color to card
   * @default mono
   */
  color?: 'mono' | 'tertiary' | 'vattjom' | 'gronsta' | 'bjornstigen' | 'juniskar';
  /** Make the card inverted
   * @default false
   */
  invert?: boolean;
  /** Change layout of card
   * @default vertical
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

export const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    children,
    className,
    color = 'mono',
    invert = false,
    layout = 'vertical',
    useHoverEffect = false,
    href = '',
    ...rest
  } = props;
  const inverted = invert.toString();

  const validChildren = getValidChildren(children);
  const clones = validChildren.map((child) => {
    return cloneElement(child, {
      color,
      inverted,
    });
  });

  return (
    <div className={cx('sk-card-wrapper', className)}>
      {href !== '' ? (
        <Link
          href={href}
          data-color={color ? color : undefined}
          data-inverted={invert ? invert : undefined}
          data-layout={layout ? layout : undefined}
          className={cx('sk-card', { 'sk-card-use-hover-effect': useHoverEffect })}
          {...rest}
          ref={ref}
        >
          {clones}
        </Link>
      ) : (
        <div
          data-color={color ? color : undefined}
          data-inverted={invert ? invert : undefined}
          data-layout={layout ? layout : undefined}
          className={cx('sk-card', { 'sk-card-use-hover-effect': useHoverEffect })}
          {...rest}
          ref={ref}
        >
          {clones}
        </div>
      )}
    </div>
  );
});

if (__DEV__) {
  Card.displayName = 'Card';
}

// NOTE: Card image component

export interface CardImageProps extends DefaultProps, React.ComponentPropsWithRef<'img'> {
  /** React node */
  children?: React.ReactNode;
  /** The image `src` attribute */
  src?: string;
  /** The alt text for the image */
  alt?: string;
  /** Make the card inverted */
  inverted?: string;
}

export const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>((props, ref) => {
  const { children, className, color, ...rest } = props;

  return (
    <img data-color={color ? color : undefined} className={cx('sk-card-image', className)} ref={ref} {...rest}>
      {children}
    </img>
  );
});

if (__DEV__) {
  CardImage.displayName = 'CardImage';
}

// NOTE: Card body component

export interface CardBodyProps
  extends DefaultProps,
    Omit<React.ComponentPropsWithRef<'div'>, 'color'>,
    Pick<CardProps, 'color'> {
  /** React node */
  children?: React.ReactNode;
  /** Make the card inverted */
  inverted?: string;
}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>((props, ref) => {
  const { children, className, color, inverted, ...rest } = props;

  return (
    <div className="sk-card-body-wrapper">
      <div data-color={color ? color : undefined} className={cx('sk-card-body', className)} ref={ref} {...rest}>
        {children}
      </div>
      <Button
        iconButton
        color={(color === 'mono' || color === 'tertiary') ? 'primary' : color}
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
  CardBody.displayName = 'CardBody';
}

// NOTE: Card Meta component

export interface CardMetaProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
  /** Insert date object and it will apply date and time to the card */
  datetime?: Date;
}

export const CardMeta = React.forwardRef<HTMLDivElement, CardMetaProps>((props, ref) => {
  const { className, datetime, ...rest } = props;
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
      {datetime ? (
        <>
          <span>
            <Icon name="calendar" variant="ghost" size={20}/>
            <time dateTime={datetime?.toISOString().split('T')[0]}>
              {datetime?.getDay()} {monthNames[datetime?.getMonth()]} {datetime?.getFullYear()}
            </time>
          </span>
          <span>
            <Icon name="clock-4" variant="ghost" size={20}/>
            <time dateTime={datetime?.getHours() + ':' + datetime?.getMinutes()}>
              {datetime?.getHours()}:{('0' + datetime?.getMinutes()).slice(-2)}
            </time>
          </span>
        </>
      ) : (
        <></>
      )}
    </div>
  );
});

if (__DEV__) {
  CardMeta.displayName = 'CardMeta';
}

// NOTE: Card Header component

export interface CardHeaderProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
  /** React node */
  children?: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <div className={cx('sk-card-body-header', className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});

// NOTE: Card Text component (CHECK THIS ELEMENT)

export interface CardTextProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
  /** React node */
  children?: React.ReactNode;
}

export const CardText = React.forwardRef<HTMLDivElement, CardTextProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div className={cx('sk-card-body-content', className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});

if (__DEV__) {
  CardText.displayName = 'CardText';
}

export default Card;
