import { cx, __DEV__ } from "@sk-web-gui/utils";
import * as React from "react";
import { Popover } from '@headlessui/react';

import { Input, InputProps } from "../input/input";
import { useState } from "react";

import { useSelectClass } from "./styles";

export const Select = React.forwardRef<HTMLSelectElement, InputProps>((props, ref) => {
  const { className, placeholder, children, size = "md", invalid, ...rest } = props;
  const [selectValue, setSelectValue] = useState("");
  const [rootButton, setRootButton] = useState<HTMLButtonElement>();
  const [activeOption, setActiveOption] = useState("");

  // const classes = useSelectClass();

  const handleOnClick = (option: any, e: React.BaseSyntheticEvent) => {
    console.log("click", option, e, option.props.children)
    setSelectValue(option.props.children);
    return close()
  }
  console.log("children", selectValue ? selectValue : "")
  if(!children) return
  return (
    
    <Popover>
      {({ close }) => (
        <div className={`relative`}>
          <Popover.Button as='span' aria-label="Inställningar"
            className={`w-full`}
            onKeyDown={(e: React.BaseSyntheticEvent)=>{
              setRootButton(e.target.closest('button'))
            }}
            onClick={(e: React.BaseSyntheticEvent)=>{
              setRootButton(e.target.closest('button'))
            }}
          >
            <Input
              ref={ref}
              size={size}
              as="select"
              value={selectValue}
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
                    // onKeyDown={(e)=>{console.log("HELLO", e);handleOnClick(option, e); close()}}
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
