import { SearchFieldBase, SearchFieldBaseProps } from './searchfield';
import { SearchFeildSuggestionsBase } from './searchfield-suggestions';
import { SearchFieldSuggestionsInput } from './searchfield-suggestions-input';
import { SearchFieldSuggestionsList } from './searchfield-suggestions-list';
import { SearchFieldSuggestionsOption } from './searchfield-suggestions-option';

interface SearchFieldProps extends React.ForwardRefExoticComponent<SearchFieldBaseProps> {
  Component: typeof SearchFieldBase;
  Input: typeof SearchFieldBase;
  Suggestions: typeof SearchFeildSuggestionsBase;
  SuggestionsList: typeof SearchFieldSuggestionsList;
  SuggestionsOption: typeof SearchFieldSuggestionsOption;
  SuggestionsInput: typeof SearchFieldSuggestionsInput;
}

const SearchField = {
  ...SearchFieldBase,
  Component: SearchFieldBase,
  Input: SearchFieldBase,
  Suggestions: SearchFeildSuggestionsBase,
  SuggestionsList: SearchFieldSuggestionsList,
  SuggestionsOption: SearchFieldSuggestionsOption,
  SuggestionsInput: SearchFieldSuggestionsInput,
} as SearchFieldProps;

export { SearchField };
export type { SearchFieldProps };
export default SearchField;
