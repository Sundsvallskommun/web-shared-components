//export * from './card';
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
  CardPreamble,
  CardPreambleProps,
  CardLink,
  CardMeta,
  CardMetaProps,
} from './card';

interface CardProps
  extends InternalCardProps,
    React.ForwardRefExoticComponent<InternalCardProps & React.RefAttributes<HTMLElement>> {
  Image: typeof CardImage;
  Body: typeof CardBody;
  Header: typeof CardHeader;
  Preamble: typeof CardPreamble;
  Link: typeof CardLink;
  Meta: typeof CardMeta;
}
const Card = InternalCard as CardProps;
Card.Image = CardImage;
Card.Body = CardBody;
Card.Header = CardHeader;
Card.Preamble = CardPreamble;
Card.Link = CardLink;
Card.Meta = CardMeta;

export type { CardProps, CardImageProps, CardBodyProps, CardHeaderProps, CardPreambleProps, CardMetaProps };
export { Card, CardImage, CardBody, CardHeader, CardPreamble, CardLink, CardMeta };

export default Card;
