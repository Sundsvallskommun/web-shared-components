import { Icon } from '@sk-web-gui/icon';
import { Link } from '@sk-web-gui/link';
import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import { ExternalLink, Text } from 'lucide-react';
import React from 'react';

// NOTE: Meta Card component

interface IMetaCardProps extends DefaultProps {
  /** React node */
  children?: React.ReactNode;
  /** Set background color to card
   * @default vattjom
   */
  color?: 'mono' | 'vattjom';
  /** If the card should be clickable, will apply hover style
   * @default false
   */
  useHoverEffect?: boolean;
  /** Make the card linkable
   */
  href?: string;
  /** Size of the card
   *  @default sm
   */
  size?: 'sm' | 'md';
  /** Set icon
   * @default <Text/>
   */
  icon?: React.JSX.Element;
}

export interface MetaCardProps extends Omit<React.ComponentPropsWithRef<'div'>, 'color'>, IMetaCardProps {}

export const MetaCard = React.forwardRef<HTMLDivElement, MetaCardProps>((props, ref) => {
  const {
    children,
    className,
    color = 'vattjom',
    useHoverEffect = false,
    href = '',
    size = 'sm',
    icon = <Text />,
    ...rest
  } = props;
  return (
    <div>
      {useHoverEffect ? (
        <Link
          href={href ? href : undefined}
          className={cx('sk-meta-card', { 'sk-meta-card-use-hover-effect': useHoverEffect }, className)}
          data-color={color ? color : undefined}
          data-size={size ? size : undefined}
          {...rest}
          ref={ref}
        >
          <Icon className={cx('sk-meta-card-text-icon', className)} size={36} icon={icon}></Icon>
          <div className={cx('sk-meta-card-body', className)}>{children}</div>
          <Icon className={cx('sk-meta-card-external-link-icon', className)} size={32} icon={<ExternalLink />}></Icon>
        </Link>
      ) : (
        <div
          className={cx('sk-meta-card', className)}
          data-color={color ? color : undefined}
          data-size={size ? size : undefined}
          {...rest}
          ref={ref}
        >
          <Icon className={cx('sk-meta-card-text-icon', className)} size={36} icon={icon}></Icon>
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

export interface MetaCardBodyProps extends React.ComponentPropsWithRef<'div'>, IMetaCardBodyProps {}

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

export interface MetaCardHeaderProps extends React.ComponentPropsWithRef<'div'>, IMetaCardHeaderProps {}

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

export interface MetaCardTextProps extends React.ComponentPropsWithRef<'div'>, IMetaCardTextProps {}

export const MetaCardText = React.forwardRef<HTMLDivElement, MetaCardTextProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div className={cx('sk-meta-card-body-content', className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});

if (__DEV__) {
  MetaCardText.displayName = 'CardText';
}

export default MetaCard;
