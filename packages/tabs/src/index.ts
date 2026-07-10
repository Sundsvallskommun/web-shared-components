import { TabsComponent, TabsComponentProps } from './tabs';
import { TabsContent, TabsContentProps } from './tabs-content';
import { TabsList, TabsListProps } from './tabs-list';
import { TabsTrigger, TabsTriggerProps } from './tabs-trigger';

const Tabs = Object.assign(TabsComponent, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

export { Tabs };
export type {
  TabsComponentProps as TabsProps,
  TabsContentProps,
  TabsListProps,
  TabsTriggerProps,
};
export default Tabs;
