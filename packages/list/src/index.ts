import React from 'react';

import { List as InternalList, ListProps as InternalListProps, ListHeader, ListItem, ListLink, ListText } from './list';

interface ListProps extends React.ForwardRefExoticComponent<InternalListProps> {
  Component: typeof InternalList;
  Item: typeof ListItem;
  Header: typeof ListHeader;
  Link: typeof ListLink;
  Text: typeof ListText;
}

export const List = {
  ...InternalList,
  Component: InternalList,
  Item: ListItem,
  Header: ListHeader,
  Link: ListLink,
  Text: ListText,
} as ListProps;

export type { ListProps };

export default List;
