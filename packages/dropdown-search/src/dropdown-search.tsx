import * as React from 'react';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import { Combobox } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useDropdownSearchClass } from './styles';

type OptionValueType = { label: string; data: any };
export interface IDropdownSearchProps {
  data: Array<any>;
  value: OptionValueType;
  onChange: (value: OptionValueType) => void;
  labelProperty?: string;
  maxAmount?: number;
  notFoundLabel?: string;
  className?: string;
  placeholder?: string;
  listClassName?: string;
  disabled?: boolean;
  size?: string;
  variant?: 'outline' | 'solid';
  render?: (value: OptionValueType) => React.ReactNode;
  filterFunction?: (query: string, option: OptionValueType) => boolean;
}

export const DropdownSearch = (props: IDropdownSearchProps) => {
  const {
    data,
    value,
    labelProperty = 'label',
    onChange,
    maxAmount = 10,
    notFoundLabel = 'Inget val hittat...',
    className,
    placeholder = 'Sök här...',
    listClassName,
    disabled,
    size = 'md',
    variant = 'outline',
    render,
    filterFunction,
    ...rest
  } = props;
  const [query, setQuery] = useState('');
  const [showResult, setShowResult] = useState(true);
  const [selectedValue, setSelectedValue] = useState<OptionValueType | undefined>();

  const variantClasses = {
    outline: 'form-field-outline',
    solid: 'form-field-solid',
  };
  const classes = useDropdownSearchClass({ size, disabled });

  const inputRef = useRef<HTMLInputElement>(null);

  const setInputFocus = () => {
    setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    });
  };

  /**
   *
   * @param option The option object
   * @returns boolean, if object passed (true) or did not pass (false)
   */
  const _filterFunction = (option: OptionValueType) => {
    return filterFunction
      ? filterFunction(query, { label: option[labelProperty], data: option })
      : option[labelProperty].toLowerCase().includes(query.toLowerCase());
  };

  /**
   * Filter for dropdown data based on search query
   */
  const filteredData = query === '' ? data : data.filter(_filterFunction);

  /**
   * Search bar input handler
   * @param event
   */
  const setQueryHandler = (event: any) => {
    setQuery(event.target.value);
  };

  /**
   * Makes sure onChange gets back the right data
   */
  const onChangeHandler = (value: OptionValueType) => {
    onChange({ label: value[labelProperty], data: value });
    setSelectedValue({ label: value[labelProperty], data: value });
    setShowResult(true);
  };

  /**
   * Handle the click on custom rendered div
   */
  const handleClickOnRendered = () => {
    if (!disabled) {
      setShowResult(false);
      setInputFocus();
    }
  };

  useEffect(() => {
    inputRef.current?.addEventListener('focus', handleClickOnRendered);
    return () => {
      inputRef.current?.removeEventListener('focus', handleClickOnRendered);
    };
  }, []);

  return (
    <div className="DropdownSearch">
      <Combobox
        value={value ? value : selectedValue ? selectedValue : ''}
        onChange={onChangeHandler}
        as={Fragment}
        disabled={disabled ? disabled : undefined}
      >
        {({ open }) => (
          <div className="form-select-wrapper block w-full relative">
            <Combobox.Input
              {...rest}
              ref={inputRef}
              className={cx(classes, variantClasses[variant], 'form-field relative', className)}
              onChange={setQueryHandler}
              displayValue={(value: OptionValueType) => value.label}
              placeholder={placeholder}
              onBlur={() => setShowResult(true)}
            />
            {render && showResult && (value || selectedValue) && (
              <div
                onClick={handleClickOnRendered}
                className={cx(classes, variantClasses[variant], 'form-field absolute inset-0 cursor-text', className)}
              >
                {render ? render(value || selectedValue) : (value || selectedValue).label}
              </div>
            )}
            {open && (
              <Combobox.Options static className={cx('form-field-outline form-select-list', listClassName)}>
                {filteredData.length === 0 && query !== '' ? (
                  <div className={`${classes}  form-select-option`}>{notFoundLabel}</div>
                ) : (
                  filteredData.slice(0, maxAmount).map((option: OptionValueType, index: number) => {
                    return (
                      <Combobox.Option
                        key={`form-select-option-dropdown-${option[labelProperty]}-${index}`}
                        value={option}
                        className={({ active }) => `form-select-option ${active ? 'active' : ''} ${classes}`}
                      >
                        {render ? render({ label: option[labelProperty], data: option }) : option[labelProperty]}
                      </Combobox.Option>
                    );
                  })
                )}
              </Combobox.Options>
            )}
          </div>
        )}
      </Combobox>
    </div>
  );
};

export default DropdownSearch;
