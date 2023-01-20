import { __DEV__ } from '@sk-web-gui/utils';
import React from 'react';
import { Input, InputProps } from '@sk-web-gui/react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export interface IISearchBarProps {
  // Parent should handle the state
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSearch: () => void;
  placeholder?: string;
  smallIcon?: boolean;
  rounded?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export type ISearchBarProps<T = HTMLElement> = IISearchBarProps & InputProps & React.RefAttributes<T>;

export const SearchBar = React.forwardRef<HTMLInputElement, ISearchBarProps>((props, ref) => {
  const {
    value,
    onChange,
    placeholder,
    onSearch,
    smallIcon = false,
    rounded = false,
    size = 'sm',
    className,
    ...rest
  } = props;

  const onSearchHandler = () => {
    onSearch();
  };

  // Search on enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearchHandler();
    }
  };

  return (
    <div className={`${className} SearchBar`}>
      <Input
        ref={ref}
        type="text"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        rounded={rounded}
        size={size}
        {...rest}
      />

      <button className="search-button" onClick={onSearchHandler} role="button">
        <SearchOutlinedIcon className={`search-button-icon ${smallIcon ? 'small' : ''}`} />
      </button>
    </div>
  );
});

export default SearchBar;

if (__DEV__) {
  SearchBar.displayName = 'SearchBar';
}
