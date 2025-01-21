import { Combobox, ComboboxProps } from '@sk-web-gui/forms';
import { __DEV__ } from '@sk-web-gui/utils';
import React from 'react';
import SearchFieldSuggestionsOption from './searchfield-suggestions-option';

export type SearchFieldSuggestionsListProps = Omit<React.ComponentPropsWithRef<ComboboxProps['List']>, 'ref'>;

export const SearchFieldSuggestionsList = React.forwardRef<HTMLFieldSetElement, SearchFieldSuggestionsListProps>(
  (props, ref) => {
    return (
      <Combobox.List ref={ref} optionType={typeof SearchFieldSuggestionsOption} {...props}>
        {props.children}
      </Combobox.List>
    );
  }
);

export default SearchFieldSuggestionsList;

if (__DEV__) {
  SearchFieldSuggestionsList.displayName = 'SearchFieldSuggestionsList';
}
