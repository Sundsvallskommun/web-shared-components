import { cx, __DEV__ } from "@sk-web-gui/utils";
import * as React from "react";
import { Popover } from '@headlessui/react';

import { Input, InputProps } from "../input/input";
import { useState } from "react";

export const Select = React.forwardRef<HTMLSelectElement, InputProps>((props, ref) => {
  const { className, placeholder, disabled = false, required = false, "aria-label": ariaLabel, children, size = "md", ...rest } = props;
  const [selectValue, setSelectValue] = useState("");
  const [activeOption, setActiveOption] = useState("");

  const handleOnClick = (option: any, e: React.BaseSyntheticEvent) => {
    setSelectValue(option.props.children);
    return close()
  }

  return (
    
    <Popover>
      {({ close }) => (
        <div className={`relative`}>
          <Popover.Button as='span'
            className={`w-full`}
            aria-label={ariaLabel}
            aria-required={required}
            aria-disabled={disabled}
          >
            <Input
              ref={ref}
              size={size}
              as="select"
              value={selectValue}
              disabled={disabled}
              aria-disabled={disabled}
              onChange={(e)=>{setSelectValue(e.target.value); setActiveOption(e.target.value)}}
              type=""
              className={cx("form-select", className)}
              {...rest}
            >
              {placeholder && <option className='form-select-option' value="">{placeholder}</option>}
              {children}
            </Input>
          </Popover.Button>
          {(
            <Popover.Panel className="w-full absolute -mt-1  text-black bg-white border border-gray-stroke z-10">
              { children && (children as any).map((option: any, index: number) => {
                return (
                  <a 
                    key={`form-select-option-${index}`}
                    className={`form-select-option form-field form-field-${size} ${activeOption == option.props.children ? 'active' : ''}`}
                    onClick={(e)=>{handleOnClick(option, e); close()}}
                  >
                    {option.props.children}
                  </a>
                )
              })
              }
            </Popover.Panel>
          )}
        </div>
      )}
    </Popover>
  );
});

if (__DEV__) {
  Select.displayName = "Select";
}
