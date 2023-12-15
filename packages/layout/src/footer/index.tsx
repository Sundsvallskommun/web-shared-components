import { Footer as InternalFooter, FooterProps as InternalFooterProps } from './footer';
import { FooterList } from './footer-list';
import { FooterListItem } from './footer-list-item';

interface FooterProps extends React.ForwardRefExoticComponent<InternalFooterProps> {
  List: typeof FooterList;
  ListItem: typeof FooterListItem;
}

export const Footer = InternalFooter as FooterProps;

Footer.List = FooterList;
Footer.ListItem = FooterListItem;

export type { FooterProps };
export default { Footer };
