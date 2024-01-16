import { __DEV__ } from '@sk-web-gui/utils';

interface TabsItemProps {
  children: React.ReactNode;
}

export const TabsItem: React.FC<TabsItemProps> = ({ children }) => {
  return <>{children}</>;
};
if (__DEV__) {
  TabsItem.displayName = 'TabsItem';
}
