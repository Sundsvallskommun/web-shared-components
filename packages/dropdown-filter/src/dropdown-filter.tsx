import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DefaultProps, cx } from '@sk-web-gui/utils';
import { useEffect, useRef, useState } from 'react';
import FilterItem from './filter-item';
import { useDropdownFilterClass } from './styles';

export interface IFilterData {
  id: number;
  name: string;
  value: boolean;
  disabled?: boolean;
  isShown?: boolean;
}

export interface DropdownFilterProps extends DefaultProps, React.ComponentPropsWithRef<'div'> {
  label: string;
  filterData: Array<IFilterData>;
  onFilterChange: (value: Array<IFilterData>) => void;
  onFilterItemChange?: (item: IFilterData) => void;
  ariaLabel?: string;
  className?: string;
  dropDownIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  hideHideAllButton?: boolean;
}

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
    hideHideAllButton = false,
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
            {hideHideAllButton ? null : (
              <button type="button" onClick={hideAllHandler}>
                Dölj alla
              </button>
            )}
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
