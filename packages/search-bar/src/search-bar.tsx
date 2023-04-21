import { DefaultProps, __DEV__ } from '@sk-web-gui/utils';
import React, { HTMLAttributes, useEffect, useState } from 'react';
import { Button } from '@sk-web-gui/button';
import { Input } from '@sk-web-gui/forms';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

export interface SearchbarProps extends DefaultProps, HTMLAttributes<HTMLInputElement> {
  // Parent should handle the state
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSearch?: (query: string) => void;
  onClose?: () => void;
  placeholder?: string;
  smallIcon?: boolean;
  rounded?: boolean;
  size?: 'sm' | 'md' | 'lg';
  searchAriaLabel?: string;
  closeAriaLabel?: string;
  searchIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
}

export const SearchBar = React.forwardRef<HTMLInputElement, SearchbarProps>((props, ref) => {
  const {
    value,
    onChange,
    placeholder,
    onSearch,
    onClose,
    smallIcon = false,
    rounded = false,
    size = 'md',
    className = '',
    searchAriaLabel = 'Sök',
    closeAriaLabel = 'Rensa',
    searchIcon,
    closeIcon,
    ...rest
  } = props;

  const [query, setQuery] = useState(value);
  const internalRef = React.useRef<HTMLInputElement | null>(null);
  React.useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => internalRef.current);

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

  useEffect(() => {
    if (value !== null || value !== undefined) {
      setQuery(value);
    }
  }, [value]);

  return (
    <div className={`search-bar ${className}`}>
      <Input.Group size={size} rounded={rounded}>
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
          {query ? (
            <Button
              type="button"
              onClick={handleOnClose}
              className="form-button form-button-close"
              aria-label={closeAriaLabel}
              iconButton
              rounded
              size="fit"
            >
              <div className="form-button-icon">
                {closeIcon ? (
                  closeIcon
                ) : (
                  <CloseOutlinedIcon className={`form-button-icon  ${smallIcon ? 'small' : ''}`} aria-hidden="true" />
                )}
              </div>
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleOnSearch}
              className="form-button form-button-search"
              aria-label={searchAriaLabel}
              iconButton
              rounded
              size="fit"
            >
              <div className="form-button-icon">
                {searchIcon ? (
                  searchIcon
                ) : (
                  <SearchOutlinedIcon aria-hidden="true" className={`form-button-icon  ${smallIcon ? 'small' : ''}`} />
                )}
              </div>
            </Button>
          )}
        </Input.RightAddin>
      </Input.Group>
    </div>
  );
});

export default SearchBar;

if (__DEV__) {
  SearchBar.displayName = 'SearchBar';
}
