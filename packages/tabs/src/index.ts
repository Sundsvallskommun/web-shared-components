import { TabsButton, TabsComponent, TabsComponentProps, TabsContent, TabsItem } from './tabs';

interface TabsProps extends React.ForwardRefExoticComponent<TabsComponentProps>, TabsComponentProps {
  Component: typeof TabsComponent;
  Item: typeof TabsItem;
  Button: typeof TabsButton;
  Content: typeof TabsContent;
}

const Tabs = {
  ...TabsComponent,
  Component: TabsComponent,
  Item: TabsItem,
  Button: TabsButton,
  Content: TabsContent,
} as TabsProps;

export { Tabs };
export type { TabsProps };
export default Tabs;
