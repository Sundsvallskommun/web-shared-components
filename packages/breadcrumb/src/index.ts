import React from 'react';

import {
  Breadcrumb as InternalBreadcrumb,
  BreadcrumbProps as InternalBreadcrumbProps,
  BreadcrumbItem,
  BreadcrumbItemProps,
  BreadcrumbLink,
  BreadcrumbLinkProps,
  BreadcrumbSeparator,
  BreadcrumbSeparatorProps,
} from './breadcrumb';

interface BreadcrumbProps
  extends InternalBreadcrumbProps,
    React.ForwardRefExoticComponent<InternalBreadcrumbProps & React.RefAttributes<HTMLElement>> {
  Item: typeof BreadcrumbItem;
  Link: typeof BreadcrumbLink;
  Separator: typeof BreadcrumbSeparator;
}

const Breadcrumb = InternalBreadcrumb as BreadcrumbProps;

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Link = BreadcrumbLink;
Breadcrumb.Separator = BreadcrumbSeparator;

export type { BreadcrumbProps, BreadcrumbItemProps, BreadcrumbLinkProps, BreadcrumbSeparatorProps };

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator };
export default Breadcrumb;
