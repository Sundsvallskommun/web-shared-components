import { cx, __DEV__ } from "@sk-web-gui/utils";
import * as React from "react";
import { Listbox } from '@headlessui/react'

import { Input, InputProps } from "../input/input";
import { Fragment, useEffect, useRef, useState } from "react";
import { useSelectClass } from "./styles";

export const Select = React.forwardRef<HTMLSelectElement, InputProps>((props, ref) => {
  const { className, placeholder, value, onChange, children, disabled, size = 'md', ...rest } = props;
  const [selectedValue, setSelectedValue] = useState(value ? value : placeholder)

  const classes = useSelectClass({ size, disabled });

  const handleOnChange = (value: any) => {
    setSelectedValue(value);
    onChange && onChange(value);
  }

  return (
    <Listbox value={selectedValue} onChange={handleOnChange} as={Fragment} disabled={disabled ? disabled : undefined}>
      <div className='form-select-wrapper block w-full relative'>
        <Listbox.Button
          as={Fragment}
        >
          <Input
            ref={ref}
            placeholder={placeholder}
            defaultValue={selectedValue}
            disabled={disabled ? disabled : undefined}
            onChange={(e)=> {onChange && onChange(e)}}
            aria-disabled={disabled ? disabled : undefined}
            className={cx("form-select", classes, className)}
            {...rest}
          />
            
        </Listbox.Button>
        <Listbox.Options className={cx("form-select-list")}>
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
      </div>
    </Listbox>
  );
});

if (__DEV__) {
  Select.displayName = "Select";
}