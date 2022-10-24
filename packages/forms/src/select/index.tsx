import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import { Listbox } from '@headlessui/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { Input, InputProps } from '../input/input';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useSelectClass } from './styles';

export type SelectProps = Omit<InputProps, 'onChange'> & { onChange: (value: string) => void };

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const { className, onChange, value, placeholder = '', children, disabled, size = 'md', ...rest } = props;
  const [selectedValue, setSelectedValue] = useState(value ? value : '');
  const visualInputRef = useRef<HTMLButtonElement>(null);
  const classes = useSelectClass({ size, disabled });
  const [width, setWidth] = useState(0);
  const [listPos, setListPos] = useState({ top: 0, left: 0 });

  const setListBoundingBox = () => {
    if (visualInputRef && visualInputRef.current) {
      setWidth(visualInputRef.current.getBoundingClientRect().width);
      setListPos({
        top: visualInputRef.current.getBoundingClientRect().top + visualInputRef.current.getBoundingClientRect().height,
        left: visualInputRef.current.getBoundingClientRect().left,
      });
    }
  };

  useEffect(() => {
    window.addEventListener('resize', setListBoundingBox);
    window.addEventListener('scroll', setListBoundingBox);
    setListBoundingBox();

    return () => {
      window.removeEventListener('resize', setListBoundingBox);
      window.removeEventListener('scroll', setListBoundingBox);
    };
  }, []);

  const handleOnChange = (value: any) => {
    setSelectedValue(value);
    onChange && onChange(value);
  };

  return (
    <Listbox value={selectedValue} onChange={handleOnChange} as={Fragment} disabled={disabled ? disabled : undefined}>
      {({ open }) => (
        <div className="form-select-wrapper block w-full relative">
          <Input
            type="hidden"
            ref={ref}
            value={selectedValue}
            disabled={disabled ? disabled : undefined}
            aria-disabled={disabled ? disabled : undefined}
          />
          <Listbox.Button ref={visualInputRef} className="w-full">
            <Input
              as="div"
              size={size}
              disabled={disabled ? disabled : undefined}
              aria-disabled={disabled ? disabled : undefined}
              className={cx('form-select', className)}
              {...rest}
            >
              {selectedValue ? selectedValue : placeholder}
              {<ArrowDropDownIcon className={`!text-2xl absolute right-4 ${open ? 'rotate-180' : ''}`} />}
            </Input>
          </Listbox.Button>
          {open && (
            <Listbox.Options
              style={{ width: width, top: listPos.top, left: listPos.left }}
              static
              className={cx('form-select-list')}
            >
              {children &&
                (children as any).map((option: any, index: number) => (
                  <Listbox.Option key={`form-select-option-${index}`} value={option.props.children} as={Fragment}>
                    {({ active, selected }) => (
                      <li className={cx('form-select-option', classes, active ? 'active' : '')}>
                        {option.props.children}
                      </li>
                    )}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          )}
        </div>
      )}
    </Listbox>
  );
});

if (__DEV__) {
  Select.displayName = 'Select';
}
