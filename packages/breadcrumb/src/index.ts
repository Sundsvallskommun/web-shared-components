import * as React from 'react';

import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Breadcrumb as InternalBreadcrumb,
  BreadcrumbProps as InternalBreadcrumbProps,
} from './breadcrumb';

interface BreadcrumbProps extends React.ForwardRefExoticComponent<InternalBreadcrumbProps> {
  Component: typeof InternalBreadcrumb;
  Item: typeof BreadcrumbItem;
  Link: typeof BreadcrumbLink;
  Separator: typeof BreadcrumbSeparator;
}

export const Breadcrumb = {
  ...InternalBreadcrumb,
  Component: InternalBreadcrumb,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Separator: BreadcrumbSeparator,
} as BreadcrumbProps;

export type { BreadcrumbProps };
export default Breadcrumb;
