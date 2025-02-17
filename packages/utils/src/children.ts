import React from 'react';

/**
 * Gets only the valid children of a component,
 * and ignores any nullish or falsy child.
 *
 * @param children the children
 */
export function getValidChildren<T = unknown>(children: React.ReactNode) {
  return React.Children.toArray(children).filter((child) => React.isValidElement<T>(child)) as React.ReactElement<T>[];
}

export const addPropsToChildren = <T extends object>(children: React.ReactNode, props: T): React.ReactNode => {
  if (Array.isArray(children)) {
    return children.map((child) => (React.isValidElement(child) ? React.cloneElement(child, props) : child));
  } else if (React.isValidElement(children)) {
    return React.cloneElement(children, props);
  } else {
    return children;
  }
};
