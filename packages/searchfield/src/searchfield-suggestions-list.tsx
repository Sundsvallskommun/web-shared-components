import { Combobox, ComboboxProps } from '@sk-web-gui/forms';
import { __DEV__ } from '@sk-web-gui/utils';
import React from 'react';

export const SearchFieldSuggestionsList = React.forwardRef<
  HTMLFieldSetElement,
  React.ComponentPropsWithRef<ComboboxProps['List']>
>((props, ref) => {
  return (
    <Combobox.List ref={ref} {...props}>
      {props.children}
    </Combobox.List>
  );
});

export default SearchFieldSuggestionsList;

if (__DEV__) {
  SearchFieldSuggestionsList.displayName = 'SearchFieldSuggestionsList';
}
