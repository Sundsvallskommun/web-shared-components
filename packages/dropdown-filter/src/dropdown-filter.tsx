import { cx, __DEV__ } from '@sk-web-gui/utils';
import { useState, useRef, useEffect } from 'react';
import * as React from 'react';
import FilterItem from './filter-item';
import ArrowIcon from './assets/arrow-icon';

export interface IFilterData {
  id: number;
  name: string;
  value: boolean;
  disabled?: boolean;
}

interface IDropdownFilter {
  label: string;
  filterData: Array<IFilterData>;
  onFilterChange: (value: Array<IFilterData>) => void;
}

export const DropdownFilter = React.forwardRef<HTMLDivElement, IDropdownFilter>((props, ref) => {
  const { label, filterData, onFilterChange } = props;

  const wrapperRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(!open);
  };

  /**
   * Switches one value of a item and send it back to parent component
   */

  const itemChangeHandler = (item: IFilterData) => {
    const array = [...filterData];
    array[array.findIndex((x) => x.id === item.id)] = item;
    onFilterChange(array);
  };

  /**
   * Switch all the values
   */

  const hideAllHandler = () => {
    const array = [...filterData];
    array.map((x) => {
      x.disabled ? null : (x.value = false);
    });
    onFilterChange(array);
  };

  const showAllHandler = () => {
    const array = [...filterData];
    array.map((x) => {
      x.disabled ? null : (x.value = true);
    });
    onFilterChange(array);
  };

  /**
   * Click outside the container listener
   */

  useEffect(() => {
    const ref = wrapperRef;

    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="DropdownFilter" ref={wrapperRef}>
      <button className="dropdown-button" onClick={openHandler}>
        <label>{label}</label>
        <span className={cx('arrow-icon', { open: open })}>
          <ArrowIcon />
        </span>
      </button>
      {open && (
        <div className="filter-container">
          <div className="filter-controls">
            <button onClick={showAllHandler}>Visa alla</button>
            <button onClick={hideAllHandler}>Dölj alla</button>
          </div>
          <ul>
            {filterData &&
              filterData.map((item: IFilterData) => (
                <FilterItem key={item.id} item={item} itemChange={itemChangeHandler} />
              ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default DropdownFilter;
