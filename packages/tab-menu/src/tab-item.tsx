import * as React from 'react';
import { cx, __DEV__ } from '@sk-web-gui/utils';

export interface IMenuItem {
  id: string | number;
  label: string;
  path: string;
  active?: string | number;
}
interface IMenuItemProps extends IMenuItem {
  onTabClick: (path: string, id: string | number) => void;
}

const TabItem = (props: IMenuItemProps) => {
  const { id, label, path, active, onTabClick } = props;

  const onClickHandler = () => {
    if (typeof onTabClick !== undefined) {
      onTabClick(path, id);
    }
  };

  return (
    <li className={cx('TabItem', { active: active === path })} onClick={onClickHandler}>
      <a>{label}</a>
    </li>
  );
};

export default TabItem;
