import { Combobox, ComboboxProps } from '@sk-web-gui/forms';
import { __DEV__ } from '@sk-web-gui/utils';
import React from 'react';

export type SearchFeildSuggestionsBaseProps = Omit<React.ComponentPropsWithRef<ComboboxProps['Component']>, 'ref'>;

export const SearchFeildSuggestionsBase = React.forwardRef<HTMLInputElement, SearchFeildSuggestionsBaseProps>(
  (props, ref) => {
    return (
      <Combobox ref={ref} {...props} className="sk-search-field-suggestions">
        {props.children}
      </Combobox>
    );
  }
);

export default SearchFeildSuggestionsBase;

if (__DEV__) {
  SearchFeildSuggestionsBase.displayName = 'SearchFeildSuggestionsBase';
}
