import { cx, __DEV__ } from '@sk-web-gui/utils';
import { useState, useRef, useEffect } from 'react';
import * as React from 'react';
import FilterItem from './filter-item';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDropdownFilterClass } from './styles';

export interface IFilterData {
  id: number;
  name: string;
  value: boolean;
  disabled?: boolean;
  isShown?: boolean;
}

interface IDropdownFilter {
  label: string;
  filterData: Array<IFilterData>;
  onFilterChange: (value: Array<IFilterData>) => void;
  onFilterItemChange?: (item: IFilterData) => void;
  ariaLabel?: string;
  className?: string;
  dropDownIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export interface DropdownFilterProps extends React.HTMLAttributes<HTMLDivElement>, IDropdownFilter {}

export const DropdownFilter = React.forwardRef<HTMLDivElement, DropdownFilterProps>((props, ref) => {
  const {
    label,
    filterData,
    onFilterChange,
    onFilterItemChange,
    ariaLabel,
    className = '',
    dropDownIcon,
    size = 'md',
  } = props;

  const wrapperRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const classes = useDropdownFilterClass({ size });

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
    onFilterItemChange && onFilterItemChange(item);
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
    <div className={cx(classes, className)} ref={wrapperRef}>
      <button
        type="button"
        className="dropdown-button"
        onClick={openHandler}
        aria-label={ariaLabel}
        aria-expanded={open}
      >
        <span>{label}</span>
        <div className={`dropdown-button-icon ${open ? 'open rotate-180' : ''}`}>
          {dropDownIcon ? dropDownIcon : <ArrowDropDownIcon className={`!text-2xl`} />}
        </div>
      </button>
      {open && (
        <div className="filter-container">
          <div className={cx('filter-controls', `form-field-${size}`)}>
            <button type="button" onClick={showAllHandler}>
              Visa alla
            </button>
            <button type="button" onClick={hideAllHandler}>
              Dölj alla
            </button>
          </div>
          <ul>
            {filterData &&
              filterData
                .filter((x) => (x.isShown == undefined || x.isShown == true ? true : false))
                .map((item: IFilterData) => (
                  <FilterItem size={size} key={item.id} item={item} itemChange={itemChangeHandler} />
                ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default DropdownFilter;
