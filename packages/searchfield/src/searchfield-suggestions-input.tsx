import { Combobox, ComboboxProps } from '@sk-web-gui/forms';
import { __DEV__, omit } from '@sk-web-gui/utils';
import React from 'react';
import SearchField, { SearchFieldProps } from './index';

interface SearchFieldSuggestionsInputProps
  extends Omit<React.ComponentPropsWithRef<SearchFieldProps['Input']>, 'value' | 'onChange' | 'onSelect'> {
  value?: string | string[];
  searchValue?: string;
  defaultValue?: string;
  onChange?: React.ComponentProps<ComboboxProps['Input']>['onChange'];
  onChangeSearch?: React.ComponentProps<ComboboxProps['Input']>['onChangeSearch'];
  onSelect?: React.ComponentProps<ComboboxProps['Input']>['onSelect'];
}

export const SearchFieldSuggestionsInput = React.forwardRef<HTMLInputElement, SearchFieldSuggestionsInputProps>(
  (props, ref) => {
    return (
      <Combobox.Input
        {...props}
        InputComp={
          <SearchField
            ref={ref}
            {...omit(props, ['onChangeSearch', 'onSelect', 'searchValue'])}
            value={props.searchValue || ''}
            onChange={props.onChange ?? (() => ({}))}
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
