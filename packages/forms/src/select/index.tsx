import { Listbox, Transition } from '@headlessui/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Tag } from '@sk-web-gui/tag';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';

import { Fragment, useEffect, useState } from 'react';
import { Input, InputProps } from '../input/input';
import { useSelectClass } from './styles';
import { useFormControl } from '../form-control';

export type OptionValueType<dataT = any> = { label: string; data: dataT };

export interface OptionProps extends Omit<InputProps, 'value'> {
  value?: OptionValueType;
}

const Option: React.FC<OptionProps> = ({ value }) => <option value={value?.data}>{value?.label}</option>;

export interface CommonProps extends Omit<InputProps, 'value' | 'onChange'> {
  listClassName?: string;
  defaultOptionsAmount?: number;
  classNameWrapper?: string;
  dropDownIcon?: React.ReactNode;
  multiple?: boolean;
}

interface SelectPropsRegular extends CommonProps {
  multiple?: false | undefined;
  value?: OptionValueType;
  onChange: (value: OptionValueType) => void;
}
interface SelectPropsMultiple extends CommonProps {
  multiple: true;
  value?: OptionValueType[];
  onChange: (value: OptionValueType[]) => void;
}

export type InternalSelectProps = SelectPropsMultiple | SelectPropsRegular;

const InternalSelect = React.forwardRef<HTMLInputElement, InternalSelectProps>((props, ref) => {
  const {
    className,
    listClassName = '',
    classNameWrapper = '',
    defaultOptionsAmount = 10,
    onChange,
    value,
    placeholder = '',
    children,
    disabled: _disabled,
    size = 'md',
    dropDownIcon,
    multiple = false,
    ...rest
  } = props;
  const [selectedValue, setSelectedValue] = useState<OptionValueType | undefined>(value as OptionValueType | undefined);
  const [selectedValues, setSelectedValues] = useState<OptionValueType[] | undefined>(
    value as OptionValueType[] | undefined
  );

  const { readOnly, disabled: contextDisabled, invalid, required, errorId, helpTextId, id } = useFormControl(props);

  const disabled = _disabled || contextDisabled;

  const [upwards, setUpwards] = useState(false);

  useEffect(() => {
    if (multiple) {
      setSelectedValues(value as OptionValueType[]);
    } else {
      setSelectedValue(value as OptionValueType);
    }
  }, [value, multiple]);

  const classes = useSelectClass({ size, disabled });

  const handleOnChange = (value: OptionValueType | OptionValueType[]) => {
    // Need props.prefix for type safety: https://github.com/microsoft/TypeScript/pull/46266
    if (!value) return;
    switch (props.multiple) {
      case true:
        setSelectedValues(value as OptionValueType[]);
        props.onChange(value as OptionValueType[]);
        break;
      case false:
        setSelectedValue(value as OptionValueType);
        props.onChange(value as OptionValueType);
        break;
      case undefined:
        setSelectedValue(value as OptionValueType);
        props.onChange(value as OptionValueType);
        break;
    }
  };

  useEffect(() => {
    const targetNode = document.getElementsByTagName('body')[0];
    if (targetNode) {
      const config = { attributes: true, childList: true, subtree: true };
      const mutationObserver = new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((n) => {
              if (n.nodeType === Node.ELEMENT_NODE) {
                const ele = n as Element;
                if (ele.classList.contains('form-select-list')) {
                  const parentRect = n.parentElement?.getBoundingClientRect();
                  const styles = window.getComputedStyle(ele);
                  const margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
                  const height = ele.scrollHeight + margin;
                  const wouldFitBelow =
                    (parentRect?.bottom || 0) + height < (window.innerHeight || document.documentElement.clientHeight);
                  const wouldFitAbove = (parentRect?.top || 0) - height > 0;
                  if (!wouldFitBelow && wouldFitAbove) {
                    setUpwards(true);
                  } else {
                    setUpwards(false);
                  }
                }
              }
            });
          }
        }
      });
      mutationObserver.observe(targetNode, config);
      return () => mutationObserver?.disconnect();
    }
  }, []);

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
              className={cx('form-select', className)}
              aria-disabled={disabled}
              readOnly={readOnly}
              aria-readonly={readOnly}
              aria-invalid={invalid}
              required={required}
              aria-required={required}
              aria-describedby={`${errorId} ${helpTextId}`}
              id={id}
              {...rest}
            >
              {multiple ? (
                <div className="form-select-has-multiple-choices">
                  <div className="form-select-multiple-chioces">
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
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                id="listitems"
                static
                style={{ maxHeight: `${defaultOptionsAmount * 5 + 1}rem` }}
                className={cx(
                  'form-select-list',
                  'form-select-list-transition',
                  listClassName,
                  upwards ? 'showabove' : null
                )}
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
                              multiple ? 'multiple' : '',
                              active ? 'active' : '',
                              selected ? 'selected' : '',
                              disabled ? 'disabled' : ''
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
            </Transition>
          )}
        </div>
      )}
    </Listbox>
  );
});

if (__DEV__) {
  InternalSelect.displayName = 'Select';
}

interface SelectProps extends React.ForwardRefExoticComponent<InternalSelectProps & React.RefAttributes<HTMLElement>> {
  multiple: any;
  Option: typeof Option;
}

const Select = InternalSelect as SelectProps;

Select.Option = Option;

export type { SelectProps };
export { Select, Option };
export default Select;
