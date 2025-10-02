import React from 'react';

import {
  Card as InternalCard,
  CardProps as InternalCardProps,
  CardImage,
  CardBody,
  CardHeader,
  CardText,
  CardMeta,
} from './card';

import {
  MetaCard as InternalMetaCard,
  MetaCardProps as InternalMetaCardProps,
  MetaCardBody,
  MetaCardHeader,
  MetaCardText,
} from './meta-card';
import { CardWrapper } from './card-wrapper';

interface CardProps extends React.ForwardRefExoticComponent<InternalCardProps> {
  Component: typeof InternalCard;
  Image: typeof CardImage;
  Body: typeof CardBody;
  Header: typeof CardHeader;
  Text: typeof CardText;
  Meta: typeof CardMeta;
  Wrapper: typeof CardWrapper;
}

interface MetaCardProps extends React.ForwardRefExoticComponent<InternalMetaCardProps> {
  Component: typeof InternalMetaCard;
  Body: typeof MetaCardBody;
  Header: typeof MetaCardHeader;
  Text: typeof MetaCardText;
}

export const Card = {
  ...InternalCard,
  Component: InternalCard,
  Image: CardImage,
  Body: CardBody,
  Header: CardHeader,
  Meta: CardMeta,
  Text: CardText,
  Wrapper: CardWrapper,
} as CardProps;

export const MetaCard = {
  ...InternalMetaCard,
  Component: InternalMetaCard,
  Body: MetaCardBody,
  Header: MetaCardHeader,
  Text: MetaCardText,
} as MetaCardProps;

export type { CardProps, MetaCardProps };
export default Card;
