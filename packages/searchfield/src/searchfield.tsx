import { Button } from '@sk-web-gui/button';
import { Input, InputProps } from '@sk-web-gui/forms';
import { Icon } from '@sk-web-gui/icon';
import { DefaultProps, __DEV__ } from '@sk-web-gui/utils';
import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchFieldBaseProps
  extends DefaultProps,
    Omit<React.ComponentProps<InputProps['Component']>, 'ref'>,
    Omit<React.ComponentPropsWithRef<'input'>, 'size'> {
  // Parent should handle the state
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onSearch?: (query: string) => void;
  onReset?: () => void;
  /** @default onValue */
  showSearchButton?: 'onValue' | boolean;
  /** @default onValue */
  showResetButton?: 'onValue' | boolean;
  placeholder?: string;
  smallIcon?: boolean;
  rounded?: boolean;
  /** @default lg */
  size?: 'md' | 'lg';
  /** @default Sök */
  searchLabel?: string;
  /** @default Rensa */
  resetAriaLabel?: string;
  searchIcon?: React.ReactNode;
  resetIcon?: React.ReactNode;
}

export const SearchFieldBase = React.forwardRef<HTMLInputElement, SearchFieldBaseProps>((props, ref) => {
  const {
    value,
    onChange,
    placeholder,
    onSearch,
    onReset,
    onKeyDown,
    showSearchButton = 'onValue',
    showResetButton = 'onValue',
    size = 'lg',
    className = '',
    searchLabel = 'Sök',
    resetAriaLabel = 'Rensa',
    searchIcon = <Icon icon={<Search />} />,
    resetIcon = <Icon icon={<X />} />,
    ...rest
  } = props;

  const [query, setQuery] = React.useState(value);
  const internalRef = React.useRef<HTMLInputElement | null>(null);
  React.useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(ref, () => internalRef.current);

  const _showSearchButton = showSearchButton === 'onValue' ? !!query?.length : showSearchButton;
  const _showResetButton = showResetButton === 'onValue' || showResetButton ? !!query?.length : showResetButton;

  const setInputFocus = () => {
    setTimeout(() => {
      internalRef.current && internalRef.current.focus();
    });
  };

  const handleOnSearch = () => {
    onSearch && onSearch(query);
  };

  const handleOnReset = () => {
    setQuery('');
    setInputFocus();
    onReset && onReset();
  };

  // Search on enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleOnSearch();
    }
    onKeyDown && onKeyDown(event);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onChange(e);
  };

  React.useEffect(() => {
    if (value !== null || value !== undefined) {
      setQuery(value);
    }
  }, [value]);

  return (
    <div className={`sk-search-field sk-searchfield-base-${size} ${className}`}>
      <Input.Group size={size}>
        <Input.LeftAddin className="sk-search-field-base-icon">{searchIcon}</Input.LeftAddin>
        <Input
          ref={internalRef}
          type="text"
          onChange={handleOnChange}
          value={query}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          {...rest}
        />
        <Input.RightAddin>
          {_showResetButton ? (
            <Button
              className="sk-search-field-button-reset"
              aria-label={resetAriaLabel}
              size="sm"
              iconButton
              variant={size === 'lg' ? 'tertiary' : 'ghost'}
              onClick={handleOnReset}
            >
              {resetIcon}
            </Button>
          ) : (
            <></>
          )}
          {_showSearchButton ? (
            <Button className="sk-search-field-button-search" type="button" onClick={handleOnSearch} size="sm">
              {searchLabel}
            </Button>
          ) : (
            <></>
          )}
        </Input.RightAddin>
      </Input.Group>
    </div>
  );
});

export default SearchFieldBase;

if (__DEV__) {
  SearchFieldBase.displayName = 'SearchFieldBase';
}
