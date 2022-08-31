import { cx, __DEV__ } from "@sk-web-gui/utils";
import * as React from "react";
import { Listbox } from '@headlessui/react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { Input, InputProps } from "../input/input";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSelectClass } from "./styles";

export const Select = React.forwardRef<HTMLSelectElement, InputProps>((props, ref) => {
  const { className, onChange, value, placeholder = '', children, disabled, size = 'md', ...rest } = props;
  const [selectedValue, setSelectedValue] = useState(value ? value : "")

  const classes = useSelectClass({ size, disabled });

  const handleOnChange = (value: any) => {
    setSelectedValue(value);
    onChange && onChange(value);
  }

  return (
    <Listbox value={selectedValue} onChange={handleOnChange} as={Fragment} disabled={disabled ? disabled : undefined}>
      {({ open }) => (
        <div className='form-select-wrapper block w-full relative'>
          <Input
            type='hidden'
            ref={ref}
            value={selectedValue}
            disabled={disabled ? disabled : undefined}
            aria-disabled={disabled ? disabled : undefined}
          />
          <Listbox.Button
            as={Fragment}
          >
            <Input
              ref={ref}
              as='button'
              type='button'
              size={size}
              disabled={disabled ? disabled : undefined}
              aria-disabled={disabled ? disabled : undefined}
              className={cx("form-select", className)}
              {...rest}
            >
              {selectedValue ? selectedValue : placeholder }
              {<ArrowDropDownIcon className={`!text-2xl absolute right-4 ${open ? 'rotate-180' : ''}`}/>}
            </Input>
          </Listbox.Button>
          { open && 
            <Listbox.Options static className={cx("form-select-list")}>
              {children && (children as any).map((option: any, index: number) => (
                <Listbox.Option
                  key={`form-select-option-${index}`}
                  value={option.props.children}
                  as={Fragment}
                >
                  {({ active, selected }) => (
                      <li
                        className={cx("form-select-option", classes, active ? 'active' : '')}
                      >
                        {option.props.children}
                      </li>
                    )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          }
        </div>
      )}
    </Listbox>
  );
});

if (__DEV__) {
  Select.displayName = "Select";
}