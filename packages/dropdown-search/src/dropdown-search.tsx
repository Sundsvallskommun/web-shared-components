import * as React from 'react';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import { Button } from '@sk-web-gui/button';
import { Badge } from '@sk-web-gui/badge';
import { Input, InputProps, OptionValueType } from '@sk-web-gui/forms';
import { useEffect, useRef, useState } from 'react';
import { useDropdownSearchClass } from './styles';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CloseIcon from '@mui/icons-material/Close';

type InputPropsOmitted = Pick<InputProps, 'size' | 'variant'>;
export interface IDropdownSearchProps extends InputPropsOmitted {
  name?: string;
  data?: Array<any>;
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
  //** List of items to be shown if searchfield is empty */
  defaultList?: any[];
  //** Defaults to id */
  idProperty?: string;
}

type OmittedHTMLInputElement = Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>;
interface DropdownSearchCommonProps extends OmittedHTMLInputElement, IDropdownSearchProps {}

interface DropdownSearchPropSingle extends DropdownSearchCommonProps {
  multiple?: false | undefined;
  value?: OptionValueType | null;
  onSelect?: (value: OptionValueType) => void;
}

interface DropdownSearchPropMultiple extends DropdownSearchCommonProps {
  multiple: true;
  value?: OptionValueType[] | null;
  onSelect?: (value: OptionValueType[]) => void;
}

export type DropdownSearchProps = DropdownSearchPropSingle | DropdownSearchPropMultiple;

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
    defaultList,
    multiple,
    idProperty = 'id',
    ...rest
  } = props;

  const [query, setQuery] = useState(value && value[labelProperty] ? value[labelProperty] : '');
  const [showOptions, setShowOptions] = useState(false);
  const [showResult, setShowResult] = useState(true);
  const [selectedValue, setSelectedValue] = useState<OptionValueType | undefined | null>(
    value as OptionValueType | undefined
  );
  const [selectedValues, setSelectedValues] = useState<OptionValueType[]>((value as OptionValueType[]) || []);
  const [activeOption, setActiveOption] = useState<number | null>(null);
  const [activeSelectedOption, setActiveSelectedOption] = useState<number | null>(null);
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

  const preFilteredData = () => {
    switch (multiple) {
      case false || undefined:
        return data || [];
      case true:
        return (
          data?.filter((data) => !selectedValues.map((value) => value.data[idProperty]).includes(data[idProperty])) ||
          []
        );
      default:
        return data || [];
    }
  };
  /**
   * Filter for dropdown data based on search query
   */
  const filteredData = preFilteredData()
    ? query === ''
      ? preFilteredData()
      : preFilteredData().filter(_filterFunction)
    : [];

  /**
   * Set query for input
   * @param value
   */
  const setQueryHandler = (value: string) => {
    setQuery(value);
    if (inputRef && inputRef.current) {
      inputRef.current.value = value;
    }
    if (!multiple) {
      setActiveOption(null);
      setActiveSelectedOption(null);
    }
  };

  /**
   * Search bar input handler
   * @param event
   */
  const onChangeHandler = (event: any) => {
    !multiple && setSelectedValue(null);
    setQueryHandler(event.target.value);
    if (event.target.value) {
      setShowOptions(true);
    } else {
      if (!defaultList) {
        setShowOptions(false);
      }
    }
    onChange && onChange(event);
  };

  const showResults = () => {
    setShowResult(true);
    setTimeout(() => {
      if (multiple) {
        setQuery('');
      }
      setShowOptions(false);
      setActiveOption(null);
      setActiveSelectedOption(null);
      setDropdownActive(false);
    });
  };

  const setSelected = (value: OptionValueType) => {
    switch (multiple) {
      case false || undefined:
        setSelectedValue({ label: value[labelProperty], data: value });
        setQueryHandler(value[labelProperty]);
        onSelect && onSelect({ label: value[labelProperty], data: value });
        showResults();
        break;
      case true:
        setSelectedValues([...selectedValues, { label: value[labelProperty], data: value }]);
        onSelect && onSelect(selectedValues);
        break;
    }
  };

  const handleRemoveSelected = (index: number) => {
    if (multiple) {
      const newValues = [...selectedValues];
      newValues.splice(index, 1);
      setSelectedValues(newValues);
      onSelect && onSelect(selectedValues);
    }
  };

  const handleClickOnRenderedResult = () => {
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
    const dataShown = !!query ? filteredData : defaultList ? defaultListOptions() : [];

    if (e.keyCode == 38) {
      // up arrow
      e.preventDefault();
      e.stopPropagation();
      if (multiple && selectedValues.length) {
        if (activeOption === null) {
          setActiveOption(null);
          setActiveSelectedOption((index) => (index == null ? 0 : index !== 0 ? index - 1 : index));
        } else if (activeOption === 0) {
          setActiveOption(null);
          setActiveSelectedOption((index) =>
            index == null ? selectedValues.length - 1 : index !== 0 ? index - 1 : index
          );
        } else {
          setActiveSelectedOption(null);
          setActiveOption((index) => (index == null ? 0 : index !== 0 ? index - 1 : index));
        }
      } else {
        setActiveSelectedOption(null);
        setActiveOption((index) => (index == null ? 0 : index !== 0 ? index - 1 : index));
      }
    } else if (e.keyCode == 40) {
      // down arrow
      e.preventDefault();
      e.stopPropagation();
      if (multiple && selectedValues.length) {
        if (!dataShown.length && activeSelectedOption === null) {
          setActiveOption(null);
          setActiveSelectedOption(0);
        } else if (activeSelectedOption == null) {
          setActiveOption((index) => (index == null ? 0 : index !== dataShown.length - 1 ? index + 1 : index));
        } else if (activeSelectedOption >= selectedValues.length - 1) {
          setActiveOption(dataShown.length > 0 ? 0 : null);
          setActiveSelectedOption((index) => (dataShown.length > 0 ? null : index));
        } else {
          setActiveOption(null);
          setActiveSelectedOption((index) =>
            index == null ? 0 : index !== selectedValues.length - 1 ? index + 1 : index
          );
        }
      } else {
        setActiveSelectedOption(null);
        setActiveOption((index) => (index == null ? 0 : index !== dataShown.length - 1 ? index + 1 : index));
      }
    } else if (e.keyCode == 13) {
      // enter
      e.preventDefault();
      e.stopPropagation();
      if (activeOption !== null) {
        const value =
          !query && defaultList
            ? defaultListOptions()[activeOption as number]
            : !!query
            ? filteredData[activeOption as number]
            : undefined;
        if (value) {
          setSelected(value);
          if (multiple) {
            if (dataShown.length - 1 > activeOption) {
              setActiveOption(activeOption);
              setActiveSelectedOption(null);
            } else if (activeOption > 0) {
              setActiveOption(activeOption - 1);
              setActiveSelectedOption(null);
            } else {
              setActiveOption(null);
              setActiveSelectedOption(0);
            }
          }
        }
      }
      if (activeSelectedOption !== null) {
        handleRemoveSelected(activeSelectedOption);
        if (selectedValues.length - 1 > activeSelectedOption) {
          setActiveOption(null);
          setActiveSelectedOption(activeSelectedOption);
        } else if (activeSelectedOption > 0) {
          setActiveOption(null);
          setActiveSelectedOption(activeSelectedOption - 1);
        } else {
          setActiveOption(dataShown.length > 0 ? 0 : null);
          setActiveSelectedOption(null);
        }
      }
    } else if (e.keyCode === 27) {
      // escape
      setDropdownActive(false);
      inputRef.current && inputRef.current.blur();
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
    switch (multiple) {
      case true:
        setSelectedValues(value || []);
        break;
      case false || undefined:
        setSelectedValue(value as OptionValueType);
        setQueryHandler(value?.label || '');
    }
    setShowResult(!!value);
  }, [value]);

  const renderResults = () => {
    if (!showResult) return undefined;
    switch (multiple) {
      case false || undefined:
        return selectedValue ? (render ? render(selectedValue) : selectedValue.label) : undefined;
      case true:
        return selectedValues?.length ? selectedValues.map((value) => value.label).join(', ') : undefined;
      default:
        return undefined;
    }
  };

  const showSuggestions =
    data && showOptions && (((notFoundLabel || filteredData.length > 0) && query) || (defaultList && !query));

  const defaultListOptions = () => {
    switch (multiple) {
      case false || undefined:
        return defaultList?.slice(0, maxAmount) || [];
      case true:
        return (
          defaultList
            ?.filter((item) => !selectedValues.map((selected) => selected.data[idProperty]).includes(item[idProperty]))
            .slice(0, maxAmount) || []
        );
      default:
        return defaultList?.slice(0, maxAmount) || [];
    }
  };
  return (
    <div ref={ref} className="dropdown-search block w-full relative">
      <Input.Group size={size}>
        <Input
          {...rest}
          as={showResult && (selectedValue || selectedValues.length) ? 'button' : 'input'}
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
          children={
            showResult && (selectedValue || selectedValues.length) ? (
              <div className="w-full flex justify-between items-center">
                <div className="truncate text-left grow">{renderResults()}</div>
                <div className="grow-0">
                  {selectedValues.length > 0 && (
                    <Badge counter={selectedValues.length} size="lg" position="standard" color="neutral" />
                  )}
                </div>
              </div>
            ) : undefined
          }
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
          {multiple &&
            selectedValues?.length > 0 &&
            selectedValues.map((selected, index) => (
              <li
                onMouseOver={() => {
                  setActiveSelectedOption(index);
                  setActiveOption(null);
                }}
                key={`form-select-option-dropdown-${selected.data[idProperty]}`}
                className={`form-select-option multiple selected ${
                  activeSelectedOption == index ? 'active' : ''
                } ${classes}`}
              >
                <button
                  className="w-full flex justify-between items-center"
                  aria-label="Ta bort val"
                  onClick={() => handleRemoveSelected(index)}
                >
                  {render ? render(selected) : selected.label}
                  <CloseIcon fontSize="large" />
                </button>
              </li>
            ))}
          {query && filteredData.length === 0 && notFoundLabel && query !== '' ? (
            <div className={`${classes}  form-select-option`}>{notFoundLabel}</div>
          ) : (
            query &&
            filteredData.slice(0, maxAmount).map((option: OptionValueType, index: number) => {
              return (
                <li
                  onMouseOver={() => {
                    setActiveOption(index);
                    setActiveSelectedOption(null);
                  }}
                  onClick={() => setSelected(option)}
                  key={`form-select-option-dropdown-${option[labelProperty]}-${index}`}
                  className={`form-select-option ${activeOption == index ? 'active' : ''} ${classes}`}
                >
                  {render ? render({ label: option[labelProperty], data: option }) : option[labelProperty]}
                </li>
              );
            })
          )}
          {!query &&
            defaultList &&
            defaultListOptions()?.map((option: OptionValueType, index: number) => {
              return (
                <li
                  onMouseOver={() => {
                    setActiveOption(index);
                    setActiveSelectedOption(null);
                  }}
                  onClick={() => setSelected(option)}
                  key={`form-select-option-dropdown-${option[labelProperty]}-${index}`}
                  className={`form-select-option ${activeOption == index ? 'active' : ''} ${classes}`}
                >
                  {render ? render({ label: option[labelProperty], data: option }) : option[labelProperty]}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
});

export default DropdownSearch;
