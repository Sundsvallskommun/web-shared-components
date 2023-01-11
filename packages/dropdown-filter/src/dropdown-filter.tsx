import { __DEV__ } from '@sk-web-gui/utils';
import { useState, useRef, useEffect } from 'react';
import * as React from 'react';
import FilterItem from './filter-item';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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
  ariaLabel?: string;
  className?: string;
  dropDownIcon?: React.ReactNode;
}

export const DropdownFilter = React.forwardRef<HTMLDivElement, IDropdownFilter>((props, ref) => {
  const { label, filterData, onFilterChange, ariaLabel, className = '', dropDownIcon } = props;

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
    <div className={`${className} DropdownFilter`} ref={wrapperRef}>
      <button
        type="button"
        className="dropdown-button"
        onClick={openHandler}
        aria-label={ariaLabel}
        aria-expanded={open}
      >
        <span>{label}</span>
        <div className={`dropdown-button-icon absolute right-4 ${open ? 'open rotate-180' : ''}`}>
          {dropDownIcon ? dropDownIcon : <ArrowDropDownIcon className={`!text-2xl`} />}
        </div>
      </button>
      {open && (
        <div className="filter-container">
          <div className="filter-controls">
            <button type="button" onClick={showAllHandler}>
              Visa alla
            </button>
            <button type="button" onClick={hideAllHandler}>
              Dölj alla
            </button>
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
