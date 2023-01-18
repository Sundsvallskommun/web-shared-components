import { __DEV__ } from '@sk-web-gui/utils';
import React from 'react';
import { Input } from '@sk-web-gui/react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export interface ISearchBarProps {
  // Parent should handle the state
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSearch: () => void;
  placeholder?: string;
  smallIcon?: boolean;
  rounded?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const SearchBar = React.forwardRef<HTMLInputElement, ISearchBarProps>((props, ref) => {
  const { value, onChange, placeholder, onSearch, smallIcon = false, rounded = false, size = 'sm' } = props;

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
    <div className="SearchBar">
      <Input
        type="text"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        rounded={rounded}
        size={size}
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
