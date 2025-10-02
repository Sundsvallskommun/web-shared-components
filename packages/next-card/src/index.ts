import React from 'react';
import { NextCard as InternalCard } from './next-card';
import { MetaCard as InternalMetaCard } from './next-meta-card';

import { Card as ReactCard, MetaCard as ReactMetaCard } from '@sk-web-gui/card';

import { CardImage } from './next-card-image';

import type { MetaCardProps as InternalMetaCardProps } from '@sk-web-gui/card';
import type { NextCardProps as InternalCardProps } from './next-card';

interface CardProps extends React.ForwardRefExoticComponent<InternalCardProps> {
  Component: typeof InternalCard;
  Image: typeof CardImage;
  Body: typeof ReactCard.Body;
  Header: typeof ReactCard.Header;
  Text: typeof ReactCard.Text;
  Meta: typeof ReactCard.Meta;
  Wrapper: typeof ReactCard.Wrapper;
}

interface MetaCardProps extends React.ForwardRefExoticComponent<InternalMetaCardProps> {
  Component: typeof InternalMetaCard;
  Body: typeof ReactMetaCard.Body;
  Header: typeof ReactMetaCard.Header;
  Text: typeof ReactMetaCard.Text;
}

export const Card = {
  ...InternalCard,
  Component: InternalCard,
  Image: CardImage,
  Body: ReactCard.Body,
  Header: ReactCard.Header,
  Meta: ReactCard.Meta,
  Text: ReactCard.Text,
  Wrapper: ReactCard.Wrapper,
} as CardProps;

export const MetaCard = {
  ...InternalMetaCard,
  Component: InternalMetaCard,
  Body: ReactMetaCard.Body,
  Header: ReactMetaCard.Header,
  Text: ReactMetaCard.Text,
} as MetaCardProps;

export type { CardProps, MetaCardProps };
export default Card;
