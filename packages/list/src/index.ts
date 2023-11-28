import * as React from 'react';

import {
  List as InternalList,
  ListProps as InternalListProps,
  ListHeader,
  ListHeaderProps,
  ListItem,
  ListItemProps,
  ListLink,
  ListText,
  ListTextProps,
} from './list';

interface ListProps
  extends InternalListProps,
    React.ForwardRefExoticComponent<InternalListProps & React.RefAttributes<HTMLElement>> {
  Item: typeof ListItem;
  Header: typeof ListHeader;
  Link: typeof ListLink;
  Text: typeof ListText;
}

const List = InternalList as ListProps;
List.Item = ListItem;
List.Header = ListHeader;
List.Link = ListLink;
List.Text = ListText;

export type { ListProps, ListItemProps, ListTextProps, ListHeaderProps };

export { List, ListItem, ListText, ListHeader, ListLink };
export default List;
