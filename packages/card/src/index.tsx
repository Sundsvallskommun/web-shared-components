import * as React from 'react';

import {
  Card as InternalCard,
  CardProps as InternalCardProps,
  CardImage,
  CardImageProps,
  CardBody,
  CardBodyProps,
  CardHeader,
  CardHeaderProps,
  CardText,
  CardTextProps,
  CardMeta,
  CardMetaProps,
} from './card';

import {
  MetaCard as InternalMetaCard,
  MetaCardProps as InternalMetaCardProps,
  MetaCardBody,
  MetaCardHeader,
  MetaCardHeaderProps,
  MetaCardText,
  MetaCardTextProps,
} from './metaCard';

interface CardProps
  extends InternalCardProps,
    React.ForwardRefExoticComponent<InternalCardProps & React.RefAttributes<HTMLElement>> {
  Image: typeof CardImage;
  Body: typeof CardBody;
  Header: typeof CardHeader;
  Text: typeof CardText;
  Meta: typeof CardMeta;
}

interface MetaCardProps
  extends InternalMetaCardProps,
    React.ForwardRefExoticComponent<InternalMetaCardProps & React.RefAttributes<HTMLElement>> {
  Body: typeof MetaCardBody;
  Header: typeof MetaCardHeader;
  Text: typeof MetaCardText;
}

const Card = InternalCard as CardProps;
Card.Image = CardImage;
Card.Body = CardBody;
Card.Header = CardHeader;
Card.Text = CardText;
Card.Meta = CardMeta;

const MetaCard = InternalMetaCard as MetaCardProps;
MetaCard.Body = MetaCardBody;
MetaCard.Header = MetaCardHeader;
MetaCard.Text = MetaCardText;

export type {
  CardProps,
  CardImageProps,
  CardBodyProps,
  CardHeaderProps,
  CardTextProps,
  CardMetaProps,
  MetaCardProps,
  MetaCardHeaderProps,
  MetaCardTextProps,
};
export { Card, MetaCard };

export default Card;
