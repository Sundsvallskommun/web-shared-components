import { __DEV__ } from '@sk-web-gui/utils';
import LinkFromNext from 'next/link';
import React from 'react';
import Link, { LinkProps } from '@sk-web-gui/link';

export interface NextLinkProps
  extends Omit<LinkProps, 'href' | 'as' | 'disabled'>,
    React.ComponentProps<typeof LinkFromNext> {}

export const NextLink = React.forwardRef<HTMLAnchorElement, NextLinkProps>((props, ref) => {
  const { size, variant, className, strong, external, inverted, hideExternalIcon, children, ...rest } = props;
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : null;
  return (
    <LinkFromNext ref={ref} {...externalProps} {...rest}>
      <Link
        size={size}
        variant={variant}
        className={className}
        strong={strong}
        external={external}
        inverted={inverted}
        hideExternalIcon={hideExternalIcon}
        rel={undefined}
        target={undefined}
        as="span"
      >
        {children}
      </Link>
    </LinkFromNext>
  );
});
if (__DEV__) {
  NextLink.displayName = 'NextLink';
}

export default NextLink;
