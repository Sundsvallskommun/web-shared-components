import { __DEV__ } from '@sk-web-gui/utils';
import React from 'react';
import SearchIcon from './assets/search-icon';

export interface ISearchBarProps {
  // Parent should handle the state
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSearch: () => void;
  placeholder?: string;
  smallIcon?: boolean;
}

const SearchBar = React.forwardRef<HTMLInputElement, ISearchBarProps>((props, ref) => {
  const {
    value,
    onChange,
    placeholder,
    onSearch,
    smallIcon
  } = props
   
  const onSearchHandler = () => {
    onSearch()
  }

  // Search on enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearchHandler()
    }
  }

  return (
    <div className="SearchBar"> 
      <input 
        type="text" 
        onChange={onChange} 
        value={value} 
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
      />
      <button 
        className="search-icon" 
        onClick={onSearchHandler}
        role="button"
      >
        <SearchIcon smallIcon={smallIcon} />
      </button>
    </div>
  )
})

if (__DEV__) {
  SearchBar.displayName = 'SearchBar';
}

export default SearchBar 