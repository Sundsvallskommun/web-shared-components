import * as React from 'react';

import {
  List as InternalList,
  ListProps as InternalListProps,
  ListBody,
  ListBodyProps,
  ListItem,
  ListItemProps,
  ListLink,
  ListText,
  ListTextProps,
} from './list';

interface ListProps
  extends InternalListProps,
    React.ForwardRefExoticComponent<InternalListProps & React.RefAttributes<HTMLElement>> {
  Body: typeof ListBody;
  Item: typeof ListItem;
  Link: typeof ListLink;
  Text: typeof ListText;
}

const List = InternalList as ListProps;
List.Body = ListBody;
List.Item = ListItem;
List.Link = ListLink;
List.Text = ListText;

export type { ListProps, ListItemProps, ListTextProps, ListBodyProps };

export { List, ListItem, ListText, ListBody, ListLink };
export default List;
