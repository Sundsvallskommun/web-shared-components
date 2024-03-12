import { Combobox, ComboboxProps } from '@sk-web-gui/forms';
import { __DEV__, omit } from '@sk-web-gui/utils';
import React from 'react';
import SearchField, { SearchFieldProps } from './index';

interface SearchFieldSuggestionsInputProps
  extends Omit<React.ComponentPropsWithRef<SearchFieldProps['Input']>, 'onSelect'> {
  defaultValue?: string;
  onSelect?: React.ComponentProps<ComboboxProps['Input']>['onSelect'];
}

export const SearchFieldSuggestionsInput = React.forwardRef<HTMLInputElement, SearchFieldSuggestionsInputProps>(
  (props, ref) => {
    const [value, setValue] = React.useState<string | string[]>();
    const [searchValue, setSearchValue] = React.useState(props.value);

    const onResetHandler = () => {
      setSearchValue('');
      setValue([]);
      props.onReset && props.onReset();
    };

    const comboboxOnChangeHandler: React.ComponentProps<ComboboxProps['Input']>['onChange'] = (e) => {
      setValue(e.target.value);
    };
    const onChangeSearchHandler: React.ComponentProps<ComboboxProps['Input']>['onChangeSearch'] = (e) => {
      props.onChange(e as React.ChangeEvent<HTMLInputElement>);
    };

    React.useEffect(() => {
      setSearchValue(props.value);
    }, [props.value]);

    return (
      <Combobox.Input
        {...omit(props, ['onChange', 'value'])}
        value={value}
        searchValue={searchValue}
        onChange={comboboxOnChangeHandler}
        onChangeSearch={onChangeSearchHandler}
        InputComp={
          <SearchField
            ref={ref}
            {...omit(props, ['onSelect'])}
            value={searchValue}
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
