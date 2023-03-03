import * as React from 'react';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import { Button } from '@sk-web-gui/button';
import { Input, InputProps, OptionValueType } from '@sk-web-gui/forms';
import { useEffect, useRef, useState } from 'react';
import { useDropdownSearchClass } from './styles';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

type InputPropsOmitted = Pick<InputProps, 'size' | 'variant'>;
export interface IDropdownSearchProps extends InputPropsOmitted {
  name?: string;
  data?: Array<any>;
  value?: OptionValueType | null;
  onSelect?: (value: OptionValueType) => void;
  /** Defaults to 'label' */
  labelProperty?: string;
  /** Defaults to 10 */
  maxAmount?: number;
  /** Defaults to 'Sök här... */
  placeholder?: string;
  notFoundLabel?: string;
  className?: string;
  listClassName?: string;
  disabled?: boolean;
  render?: (value: OptionValueType) => React.ReactNode;
  filterFunction?: (query: string, option: OptionValueType) => boolean;
  nullable?: true | undefined;
  useDeleteButton?: boolean;
  deleteCallback?: () => void;
  /** Defaults to 'Rensa sökfältet' */
  deleteAriaLabel?: string;
  closeIcon?: React.ReactNode;
}

type OmittedHTMLInputElement = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>;
export interface DropdownSearchProps extends OmittedHTMLInputElement, IDropdownSearchProps {}

export const DropdownSearch = React.forwardRef<HTMLInputElement, DropdownSearchProps>((props, ref) => {
  const {
    name,
    data,
    value,
    labelProperty = 'label',
    onChange,
    onSelect,
    maxAmount = 10,
    notFoundLabel,
    className,
    placeholder = 'Sök här...',
    listClassName,
    disabled,
    size = 'md',
    variant = 'outline',
    render,
    filterFunction,
    nullable = true,
    useDeleteButton = false,
    deleteCallback,
    deleteAriaLabel = 'Rensa sökfältet',
    closeIcon,
    ...rest
  } = props;

  const [query, setQuery] = useState(value && value[labelProperty] ? value[labelProperty] : '');
  const [showOptions, setShowOptions] = useState(false);
  const [showResult, setShowResult] = useState(true);
  const [selectedValue, setSelectedValue] = useState<OptionValueType | undefined | null>(value);
  const [activeOption, setActiveOption] = useState<number | null>(null);
  const [dropdownActive, setDropdownActive] = useState<boolean>(false);

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
   * Internal filterfunction with support for external filterFunction
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
  const filteredData = data ? (query === '' ? data : data.filter(_filterFunction)) : [];

  /**
   * Set query for input
   * @param value
   */
  const setQueryHandler = (value: string) => {
    setQuery(value);
    if (inputRef && inputRef.current) {
      inputRef.current.value = value;
    }
    setActiveOption(null);
  };

  /**
   * Search bar input handler
   * @param event
   */
  const onChangeHandler = (event: any) => {
    setSelectedValue(null);
    setQueryHandler(event.target.value);
    if (event.target.value) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
    onChange && onChange(event);
  };

  const showResults = () => {
    setShowResult(true);
    setTimeout(() => {
      setShowOptions(false);
      setActiveOption(null);
      setDropdownActive(false);
    }, 50);
  };

  const setSelected = (value: OptionValueType) => {
    setSelectedValue({ label: value[labelProperty], data: value });
    setQueryHandler(value[labelProperty]);
    onSelect && onSelect({ label: value[labelProperty], data: value });
    showResults();
  };

  const handleClickOnRenderedResult = () => {
    console.log('handleClickOnRenderedResult');
    if (!disabled) {
      setShowResult(false);
      setShowOptions(true);
      setInputFocus();
    }
  };

  const onBlurHandler = () => {
    if (!dropdownActive) {
      showResults();
    } else {
      inputRef.current && inputRef.current.focus();
    }
  };

  const keyboardHandler = (e: any) => {
    if (e.keyCode == 38) {
      // up arrow
      setActiveOption((index) => (index == null ? 0 : index !== 0 ? index - 1 : index));
      e.preventDefault();
      e.stopPropagation();
    } else if (e.keyCode == 40) {
      // down arrow
      setActiveOption((index) => (index == null ? 0 : index !== filteredData.length - 1 ? index + 1 : index));
      e.preventDefault();
      e.stopPropagation();
    } else if (e.keyCode == 13) {
      // enter
      if (activeOption == null) return;
      e.preventDefault();
      e.stopPropagation();
      const value = filteredData[activeOption as number];
      if (value) {
        setSelected(value);
      }
    }
  };

  const handleDeleteCallback = () => {
    setQuery('');
    setSelectedValue(null);
    setShowResult(false);
    setInputFocus();
    deleteCallback && deleteCallback();
  };

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
      setQueryHandler(value.label);
      setShowResult(true);
    }
  }, [value]);

  const showSuggestions = data && query && showOptions && (notFoundLabel || filteredData.length > 0);

  return (
    <div ref={ref} className="dropdown-search block w-full relative">
      <Input.Group size={size}>
        <Input
          {...rest}
          as={showResult && selectedValue ? 'button' : 'input'}
          aria-expanded={showSuggestions}
          value={query}
          ref={inputRef}
          size={size}
          variant={variant}
          autoComplete="off"
          onChange={onChangeHandler}
          onKeyDown={keyboardHandler}
          placeholder={placeholder}
          onBlur={onBlurHandler}
          disabled={disabled ? disabled : undefined}
          onClick={handleClickOnRenderedResult}
          onFocus={handleClickOnRenderedResult}
          className={cx('cursor-text', className)}
          children={render && showResult && selectedValue ? render(selectedValue) : undefined}
        />
        {useDeleteButton && query && (
          <Input.RightAddin>
            <Button
              type="button"
              onClick={handleDeleteCallback}
              className="form-button"
              aria-label={deleteAriaLabel}
              iconButton
              rounded
              size="fit"
            >
              <div className="form-button-icon">{closeIcon ? closeIcon : <CloseOutlinedIcon aria-hidden="true" />}</div>
            </Button>
          </Input.RightAddin>
        )}
      </Input.Group>

      {showSuggestions && (
        <ul
          className={cx('form-field-outline form-select-list', listClassName)}
          onMouseEnter={() => setDropdownActive(true)}
          onMouseLeave={() => setDropdownActive(false)}
        >
          {filteredData.length === 0 && notFoundLabel && query !== '' ? (
            <div className={`${classes}  form-select-option`}>{notFoundLabel}</div>
          ) : (
            filteredData.slice(0, maxAmount).map((option: OptionValueType, index: number) => {
              return (
                <li
                  onMouseOver={() => setActiveOption(index)}
                  onClick={() => setSelected(option)}
                  key={`form-select-option-dropdown-${option[labelProperty]}-${index}`}
                  className={`form-select-option ${activeOption == index ? 'active' : ''} ${classes}`}
                >
                  {render ? render({ label: option[labelProperty], data: option }) : option[labelProperty]}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
});

export default DropdownSearch;
