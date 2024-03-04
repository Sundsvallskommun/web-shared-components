import { ComboboxBase, ComboboxBaseProps } from './combobox';
import { ComboboxInput } from './combobox-input';
import { ComboboxList } from './combobox-list';
import { ComboboxOption } from './combobox-option';

interface ComboboxProps extends React.ForwardRefExoticComponent<ComboboxBaseProps> {
  Component: typeof ComboboxBase;
  Input: typeof ComboboxInput;
  List: typeof ComboboxList;
  Option: typeof ComboboxOption;
}

const Combobox = {
  ...ComboboxBase,
  Component: ComboboxBase,
  Input: ComboboxInput,
  List: ComboboxList,
  Option: ComboboxOption,
} as ComboboxProps;

export { Combobox };
export type { ComboboxProps };
export default Combobox;
