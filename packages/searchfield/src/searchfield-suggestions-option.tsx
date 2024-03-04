import { Combobox, ComboboxProps } from '@sk-web-gui/forms';
import { __DEV__ } from '@sk-web-gui/utils';
import React from 'react';

export const SearchFieldSuggestionsOption = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithRef<ComboboxProps['Option']>
>((props, ref) => {
  return (
    <Combobox.Option ref={ref} {...props}>
      {props.children}
    </Combobox.Option>
  );
});

export default SearchFieldSuggestionsOption;

if (__DEV__) {
  SearchFieldSuggestionsOption.displayName = 'SearchFieldSuggestionsOption';
}
