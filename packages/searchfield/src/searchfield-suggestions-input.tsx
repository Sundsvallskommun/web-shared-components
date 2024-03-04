import { __DEV__ } from '@sk-web-gui/utils';
import React from 'react';
import SearchField, { SearchFieldProps } from './index';
import { Combobox, ComboboxProps } from '@sk-web-gui/forms';

interface SearchFieldSuggestionsInputProps
  extends Omit<React.ComponentPropsWithRef<SearchFieldProps['Input']>, 'value' | 'onChange'> {
  value: string;
  onChange: Exclude<React.ComponentProps<ComboboxProps['Input']>['onChange'], undefined>;
}

export const SearchFieldSuggestionsInput = React.forwardRef<HTMLInputElement, SearchFieldSuggestionsInputProps>(
  (props, ref) => {
    const { ...rest } = props;

    const onChangeSearchHandler: React.ComponentProps<ComboboxProps['Input']>['onChangeSearch'] = (e) => {
      props.onChange && props.onChange(e);
    };

    return (
      <Combobox.Input
        {...rest}
        defaultValue={
          typeof rest.defaultValue === 'string' || Array.isArray(rest.defaultValue) ? rest.defaultValue : undefined
        }
        onChangeSearch={onChangeSearchHandler}
        InputComp={<SearchField ref={ref} {...rest} />}
      />
    );
  }
);

export default SearchFieldSuggestionsInput;

if (__DEV__) {
  SearchFieldSuggestionsInput.displayName = 'SearchFieldSuggestionsInput';
}
