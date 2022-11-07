import * as React from 'react';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import { Combobox } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react';
import { useDropdownSearchClass } from './styles';

export interface IDropdownSearchProps {
  data: {id: number, name: string}[]
  value: {id: number, name: string}
  onChange: (value: {id: number, name: string}) => void
  maxAmount: number
  notFoundLabel: string
  className?: string
  placeholder?: string
  listClassName?: string
  disabled?: boolean
  size?: string
}

export const DropdownSearch = (props: IDropdownSearchProps) => {
  const {
    data,
    value,
    onChange,
    maxAmount = 10,
    notFoundLabel = 'Inget val hittat...',
    className,
    placeholder = 'Sök här...',
    listClassName,
    disabled,
    size = 'md',
  } = props;
  
  const [query, setQuery] = useState('')
  const [show, setShow] = useState(false)

  const classes = useDropdownSearchClass({ size, disabled });
  
  /**
   * Filter for dropdown data based on search query
   */
  const filteredData = (query === '') ? data : data.filter((item: any) => {
    return item.name.toLowerCase().includes(query.toLowerCase())
  });


  /**
   * Search bar input handler
   * @param event 
   */
  const setQueryHandler = (event: any) => {
    setShow(true)
    setQuery(event.target.value)
  }

  /**
   * Makes sure onChange gets back the right data
   */
  const onChangeHandler = (value: number) => {
    setShow(false)
    onChange(data.filter((item) => item.id === value)[0])
  }

  return (
    <div className="DropdownSearch">
      <Combobox 
        value={value} 
        onChange={onChangeHandler} 
        as={Fragment} 
        disabled={disabled ? disabled : undefined}
        >
        <div className="form-select-wrapper block w-full relative">
          <Combobox.Input
            className={cx('form-field form-field-outline form-field-md', className)}
            onChange={setQueryHandler}
            displayValue={(item: {id: number, name: string}) => item.name}
            placeholder={placeholder}
          />
          {show && 
            <Combobox.Options
              static
              className={cx('form-field-outline form-select-list', listClassName)}
            >
              {filteredData.length === 0 && query !== '' ? (
                <div className="form-field-md form-select-option">
                    {notFoundLabel}
                  </div>
                ) : ( 
                  filteredData.slice(0, maxAmount).map((item: any) => (
                    <Combobox.Option 
                      key={item.id} 
                      value={item.id} 
                      className={({ active }) =>
                        `form-field-md form-select-option ${active ? 'active' : ''} ${classes}`
                      }
                    >
                    {item.name}
                  </Combobox.Option>
                ))
                )}
            </Combobox.Options>
          }
        </div>
      </Combobox>
    </div>
  );
};

export default DropdownSearch