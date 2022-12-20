import { Checkbox } from '@sk-web-gui/checkbox';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { IFilterData } from './dropdown-filter';

interface IFilterItemProps {
  item: IFilterData;
  itemChange: (item: IFilterData) => void;
}

const FilterItem = ({ item, itemChange }: IFilterItemProps) => {
  const onClickHandler = () => {
    itemChange({ ...item, value: !item.value });
  };

  return (
    <li className={cx('FilterItem', { disabled: item?.disabled })}>
      <label htmlFor={'checkbox-' + item.id}>{item.name}</label>
      <Checkbox id={'checkbox-' + item.id} checked={item.value} disabled={item.disabled} onChange={onClickHandler} />
    </li>
  );
};

export default FilterItem;
