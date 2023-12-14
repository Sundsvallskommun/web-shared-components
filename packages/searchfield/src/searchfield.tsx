import { Button } from '@sk-web-gui/button';
import { Input, InputProps } from '@sk-web-gui/forms';
import { Icon } from '@sk-web-gui/icon';
import { DefaultProps, __DEV__ } from '@sk-web-gui/utils';
import React from 'react';

export interface SearchFieldProps extends DefaultProps, InputProps, Omit<React.ComponentPropsWithRef<'input'>, 'size'> {
  // Parent should handle the state
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSearch?: (query: string) => void;
  onClose?: () => void;
  showSeachButton?: boolean;
  placeholder?: string;
  smallIcon?: boolean;
  rounded?: boolean;
  size?: 'md' | 'lg';
  searchLabel?: string;
  closeAriaLabel?: string;
  searchIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
}

export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>((props, ref) => {
  const {
    value,
    onChange,
    placeholder,
    onSearch,
    onClose,
    showSeachButton,
    size = 'lg',
    className = '',
    searchLabel = 'Sök',
    closeAriaLabel = 'Rensa',
    searchIcon = <Icon name="search" />,
    closeIcon = <Icon name="x" />,
    ...rest
  } = props;

  const [query, setQuery] = React.useState(value);
  const internalRef = React.useRef<HTMLInputElement | null>(null);
  React.useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(ref, () => internalRef.current);

  const setInputFocus = () => {
    setTimeout(() => {
      internalRef.current && internalRef.current.focus();
    });
  };

  const handleOnSearch = () => {
    onSearch && onSearch(query);
  };

  const handleOnClose = () => {
    setQuery('');
    setInputFocus();
    onClose && onClose();
  };

  // Search on enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleOnSearch();
    }
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
    <div className={`sk-search-field sk-searchfield-${size} ${className}`}>
      <Input.Group size={size}>
        <Input.LeftAddin className="sk-searchfield-icon">{searchIcon}</Input.LeftAddin>
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
          {query && !showSeachButton ? (
            <Button
              aria-label={closeAriaLabel}
              size="sm"
              iconButton
              variant={size === 'lg' ? 'primary' : 'ghost'}
              onClick={() => handleOnClose()}
            >
              {closeIcon}
            </Button>
          ) : showSeachButton && query ? (
            <Button type="button" onClick={handleOnSearch} size="sm">
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

export default SearchField;

if (__DEV__) {
  SearchField.displayName = 'SearchField';
}
