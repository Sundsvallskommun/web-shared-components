import { Combobox, ComboboxProps } from '@sk-web-gui/forms';
import { __DEV__, omit } from '@sk-web-gui/utils';
import React from 'react';
import SearchField, { SearchFieldProps } from './index';

interface SearchFieldSuggestionsInputProps
  extends Omit<React.ComponentPropsWithRef<SearchFieldProps['Input']>, 'value' | 'onChange' | 'onSelect'> {
  value?: string | string[];
  searchValue?: string;
  defaultValue?: string;
  defaultSearchValue?: string;
  onChange?: React.ComponentProps<ComboboxProps['Input']>['onChange'];
  onChangeSearch?: React.ComponentProps<ComboboxProps['Input']>['onChangeSearch'];
  onSelect?: React.ComponentProps<ComboboxProps['Input']>['onSelect'];
}

export const SearchFieldSuggestionsInput = React.forwardRef<HTMLInputElement, SearchFieldSuggestionsInputProps>(
  (props, ref) => {
    const {
      onChangeSearch,
      onSelect,
      value: _value = props.defaultValue,
      searchValue: _searchValue = props.defaultSearchValue,
      onReset,
      ...rest
    } = omit(props, ['defaultValue', 'defaultSearchValue']);
    const [value, setValue] = React.useState(_value);
    const [searchValue, setSearchValue] = React.useState(_searchValue);

    const onChangeHandler: React.ComponentProps<ComboboxProps['Input']>['onChange'] = (e) => {
      props.onChange && props.onChange(e);
    };

    const onChangeSearchHandler: React.ComponentProps<ComboboxProps['Input']>['onChangeSearch'] = (e) => {
      if (onChangeSearch) {
        onChangeSearch(e);
      } else {
        setSearchValue(e.target.value);
      }
    };

    const onSelectHandler: React.ComponentProps<ComboboxProps['Input']>['onSelect'] = (e) => {
      setValue(e.target.value);
      setSearchValue('');
      if (onSelect) {
        onSelect(e);
      }
    };

    const onResetHandler: React.ComponentPropsWithRef<SearchFieldProps['Input']>['onReset'] = () => {
      setValue('');
      setSearchValue('');
      if (onReset) {
        onReset();
      }
    };

    React.useEffect(() => {
      setValue(_value);
    }, [_value]);

    React.useEffect(() => {
      setSearchValue(_searchValue);
    }, [_searchValue]);

    return (
      <Combobox.Input
        {...rest}
        value={value}
        searchValue={searchValue}
        onChange={onChangeHandler}
        onChangeSearch={onChangeSearchHandler}
        onSelect={onSelectHandler}
        InputComp={
          <SearchField
            ref={ref}
            {...rest}
            value={searchValue || ''}
            onChange={onChangeSearchHandler}
            onReset={onResetHandler}
          />
        }
      />
    );
  }
);

export default SearchFieldSuggestionsInput;

if (__DEV__) {
  SearchFieldSuggestionsInput.displayName = 'SearchFieldSuggestionsInput';
}
