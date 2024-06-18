import { Footer as InternalFooter, FooterProps as InternalFooterProps } from './footer';
import { FooterContent } from './footer-content';
import { FooterList } from './footer-list';
import { FooterListItem } from './footer-list-item';
import { FooterListWrapper } from './footer-list-wrapper';
import { FooterLogoWrapper } from './footer-logo-wrapper';

interface FooterProps extends React.ForwardRefExoticComponent<InternalFooterProps> {
  Content: typeof FooterContent;
  LogoWrapper: typeof FooterLogoWrapper;
  ListWrapper: typeof FooterListWrapper;
  List: typeof FooterList;
  ListItem: typeof FooterListItem;
}

export const Footer = InternalFooter as FooterProps;

Footer.Content = FooterContent;
Footer.LogoWrapper = FooterLogoWrapper;
Footer.ListWrapper = FooterListWrapper;
Footer.List = FooterList;
Footer.ListItem = FooterListItem;

export type { FooterProps };
export default { Footer };
