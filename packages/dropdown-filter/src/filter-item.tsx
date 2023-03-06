import { Checkbox } from '@sk-web-gui/checkbox';
import { cx } from '@sk-web-gui/utils';
import { IFilterData } from './dropdown-filter';
import { useFilterItemClass } from './styles';
import * as React from 'react';

interface IFilterItemProps {
  item: IFilterData;
  itemChange: (item: IFilterData) => void;
  size: 'sm' | 'md' | 'lg';
}

const FilterItem = ({ item, itemChange, size }: IFilterItemProps) => {
  const onClickHandler = () => {
    itemChange({ ...item, value: !item.value });
  };

  const classes = useFilterItemClass({ size, disabled: item.disabled });

  return (
    <li className={cx(classes)}>
      <label htmlFor={'checkbox-' + item.id}>{item.name}</label>
      <Checkbox id={'checkbox-' + item.id} checked={item.value} disabled={item.disabled} onChange={onClickHandler} />
    </li>
  );
};

export default FilterItem;
