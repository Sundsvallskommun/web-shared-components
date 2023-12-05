import { Link } from '@sk-web-gui/link';
import { Icon } from '@sk-web-gui/icon';
import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import React from 'react';

// NOTE: Meta Card component

interface IMetaCardProps extends DefaultProps {
  /** React node */
  children?: React.ReactNode;
  /** Set background color to card
   * @default vattjom
   */
  color?: 'tertiary' | 'vattjom';
  /** If the card should be clickable, will apply hover style
   * @default false;
   */
  useHoverEffect?: boolean;
  /** Make the card linkable
   */
  href?: string;
}

export interface MetaCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>, IMetaCardProps {}

export const MetaCard = React.forwardRef<HTMLDivElement, MetaCardProps>((props, ref) => {
  const { children, className, color = 'vattjom', useHoverEffect = false, href = '', ...rest } = props;

  return (
    <div>
      {useHoverEffect ? (
        <Link
          href={href ? href : undefined}
          className={cx('sk-meta-card', className)}
          data-color={color ? color : undefined}
          {...rest}
          ref={ref}
        >
          <Icon className={cx('sk-meta-card-text-icon', className)} size={36} name="text"></Icon>
          <div className={cx('sk-meta-card-body', className)}>{children}</div>
          <Icon className={cx('sk-meta-card-external-link-icon', className)} size={32} name="external-link"></Icon>
        </Link>
      ) : (
        <div className={cx('sk-meta-card', className)} data-color={color ? color : undefined} {...rest} ref={ref}>
          <Icon className={cx('sk-meta-card-text-icon', className)} size={36} name="text"></Icon>
          <div className={cx('sk-meta-card-body', className)}>{children}</div>
          <div className={cx('sk-meta-card-external-link-icon', className)}></div>
        </div>
      )}
    </div>
  );
});

if (__DEV__) {
  MetaCard.displayName = 'MetaCard';
}

// NOTE: Meta Card body component

interface IMetaCardBodyProps extends DefaultProps {
  /** React node */
  children?: React.ReactNode;
}

export interface MetaCardBodyProps extends React.HTMLAttributes<HTMLDivElement>, IMetaCardBodyProps {}

export const MetaCardBody = React.forwardRef<HTMLDivElement, MetaCardBodyProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div className={cx('sk-meta-card-body', className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});

if (__DEV__) {
  MetaCardBody.displayName = 'CardBody';
}

// NOTE: Meta Card header component

interface IMetaCardHeaderProps extends DefaultProps {
  /** React node */
  children?: React.ReactNode;
}

export interface MetaCardHeaderProps extends React.HTMLAttributes<HTMLDivElement>, IMetaCardHeaderProps {}

export const MetaCardHeader = React.forwardRef<HTMLDivElement, MetaCardHeaderProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div className={cx('sk-meta-card-body-header', className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});

if (__DEV__) {
  MetaCardHeader.displayName = 'CardHeader';
}

// NOTE: Meta Card text component

interface IMetaCardTextProps extends DefaultProps {
  /** React node */
  children?: React.ReactNode;
}

export interface MetaCardTextProps extends React.HTMLAttributes<HTMLDivElement>, IMetaCardTextProps {}

export const MetaCardText = React.forwardRef<HTMLDivElement, MetaCardTextProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div className={cx('sk-meta-card-body-text', className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});

if (__DEV__) {
  MetaCardText.displayName = 'CardText';
}

export default MetaCard;
