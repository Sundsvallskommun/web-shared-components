import { Listbox } from '@headlessui/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { cx, isArray, __DEV__ } from '@sk-web-gui/utils';
import { Tag } from '@sk-web-gui/react';
import * as React from 'react';

import { Fragment, useEffect, useState } from 'react';
import { Input, InputProps } from '../input/input';
import { useSelectClass } from './styles';

export type OptionValueType = { label: string; data: any };

export interface OptionProps extends Omit<InputProps, 'value'> {
  value?: OptionValueType;
}

const Option: React.FC<OptionProps> = ({ value }) => <option value={value?.data}>{value?.label}</option>;

export interface SelectProps extends Omit<InputProps, 'value' | 'onChange'> {
  onChange: (value: OptionValueType | OptionValueType[]) => void;
  listClassName?: string;
  defaultOptionsAmount?: number;
  value?: OptionValueType | OptionValueType[];
  classNameWrapper?: string;
  dropDownIcon?: React.ReactNode;
  multiple?: boolean;
}

const InternalSelect = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const {
    className,
    listClassName = '',
    classNameWrapper = '',
    defaultOptionsAmount = 10,
    onChange,
    value,
    placeholder = '',
    children,
    disabled,
    size = 'md',
    dropDownIcon,
    multiple = false,
    ...rest
  } = props;
  const [selectedValue, setSelectedValue] = useState<OptionValueType | undefined>();
  const [selectedValues, setSelectedValues] = useState<OptionValueType[] | undefined>(undefined);

  useEffect(() => {
    if (multiple) {
      isArray(value) ? setSelectedValues(value) : setSelectedValues([value as OptionValueType]);
    } else {
      setSelectedValue(value as OptionValueType);
    }
  }, [value, multiple]);

  const classes = useSelectClass({ size, disabled });

  const handleOnChange = (value: OptionValueType | OptionValueType[]) => {
    if (multiple) {
      setSelectedValues(value as OptionValueType[]);
    }
    setSelectedValue(value as OptionValueType);
    onChange && onChange(value);
  };

  return (
    <Listbox
      value={multiple ? selectedValues : selectedValue}
      onChange={handleOnChange}
      as={Fragment}
      disabled={disabled ? disabled : undefined}
      multiple={multiple}
    >
      {({ open }) => (
        <div className={`${classNameWrapper} form-select-wrapper `}>
          <Listbox.Button as={Fragment}>
            <Input
              ref={ref}
              as="button"
              type="button"
              size={size}
              disabled={disabled ? disabled : undefined}
              aria-disabled={disabled ? disabled : undefined}
              className={cx('form-select', className)}
              {...rest}
            >
              {multiple ? (
                <div className="flex w-full justify-between pr-md">
                  <div className="truncate pr-md">
                    {selectedValues && selectedValues.length
                      ? selectedValues.map((value) => value.label).join(', ')
                      : placeholder}
                  </div>
                  {selectedValues && selectedValues.length > 1 && (
                    <Tag size="sm" variant="solid">
                      {selectedValues?.length}
                    </Tag>
                  )}
                </div>
              ) : (
                <span>{selectedValue ? selectedValue.label : placeholder}</span>
              )}

              <div className={`form-select-icon ${open ? 'open rotate-180' : ''}`}>
                {dropDownIcon ? dropDownIcon : <ArrowDropDownIcon className={`!text-2xl`} />}
              </div>
            </Input>
          </Listbox.Button>
          {open && (
            <Listbox.Options
              static
              style={{ maxHeight: `${defaultOptionsAmount * 50 + 10}px` }}
              className={cx('form-select-list', listClassName)}
            >
              {children &&
                (children as any).map((option: any, index: number) => {
                  const { value, disabled, className, ...rest } = option.props;
                  return (
                    <Listbox.Option
                      key={`form-select-option-${index}`}
                      value={option.props?.value}
                      disabled={option.props.disabled}
                      as={Fragment}
                    >
                      {({ active, selected }) => (
                        <li
                          className={cx(
                            'form-select-option',
                            classes,
                            className,
                            option.props.disabled
                              ? 'opacity-75 cursor-not-allowed hover:bg-white hover:text-black'
                              : '',
                            multiple ? 'multiple' : '',
                            active ? 'active' : '',
                            selected ? 'selected' : ''
                          )}
                          {...rest}
                        >
                          {option.props?.value?.label}
                        </li>
                      )}
                    </Listbox.Option>
                  );
                })}
            </Listbox.Options>
          )}
        </div>
      )}
    </Listbox>
  );
});

if (__DEV__) {
  InternalSelect.displayName = 'Select';
}

interface Select extends React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLElement>> {
  Option: typeof Option;
}

const Select = InternalSelect as Select;

Select.Option = Option;

export { Select, Option };
