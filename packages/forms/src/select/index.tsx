import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import { Listbox } from '@headlessui/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { Input, InputProps } from '../input/input';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useSelectClass } from './styles';
import { DefaultProps } from '@sk-web-gui/theme';

type OptionValueType = { label: string; data: any };
export interface OptionProps extends DefaultProps {
  value?: OptionValueType;
}

export const Option: React.FC<OptionProps> = ({ value }) => <option value={value?.data}>{value?.label}</option>;

export interface SelectProps extends Omit<InputProps, 'value'> {
  onChange: (value: any) => void;
  listClassName?: string;
  defaultOptionsAmount?: number;
  value?: OptionValueType;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const {
    className,
    listClassName,
    defaultOptionsAmount = 10,
    onChange,
    value,
    placeholder = '',
    children,
    disabled,
    size = 'md',
    ...rest
  } = props;
  const [selectedValue, setSelectedValue] = useState<OptionValueType | undefined>(value);

  useEffect(() => {
    console.log({ value });
    setSelectedValue(value);
  }, [value]);

  const classes = useSelectClass({ size, disabled });

  const handleOnChange = (value: any) => {
    console.log('handleOnChange value:', value);
    setSelectedValue(value);
    onChange && onChange(value);
  };

  return (
    <>
      <Listbox value={selectedValue} onChange={handleOnChange} as={Fragment} disabled={disabled ? disabled : undefined}>
        {({ open }) => (
          <div className="form-select-wrapper block w-full relative">
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
                {selectedValue ? selectedValue.label : placeholder}
                {<ArrowDropDownIcon className={`!text-2xl absolute right-4 ${open ? 'rotate-180' : ''}`} />}
              </Input>
            </Listbox.Button>
            {open && (
              <Listbox.Options
                static
                style={{ maxHeight: `${defaultOptionsAmount * 50 + 10}px` }}
                className={cx('form-select-list', listClassName)}
              >
                {children &&
                  (children as any).map((option: any, index: number) => (
                    <Listbox.Option key={`form-select-option-${index}`} value={option.props?.value} as={Fragment}>
                      {({ active, selected }) => (
                        <li className={cx('form-select-option', classes, active ? 'active' : '')}>
                          {option.props?.value?.label}
                        </li>
                      )}
                    </Listbox.Option>
                  ))}
              </Listbox.Options>
            )}
          </div>
        )}
      </Listbox>
    </>
  );
});

if (__DEV__) {
  Select.displayName = 'Select';
}
