import ComboboxBase, { ComboboxBaseProps } from './combobox';
import { ComboboxList } from './combobox-list';
import { ComboboxOption } from './combobox-option';

interface ComboboxProps extends React.ForwardRefExoticComponent<ComboboxBaseProps> {
  Component: typeof ComboboxBase;
  List: typeof ComboboxList;
  Option: typeof ComboboxOption;
}

const Combobox = {
  ...ComboboxBase,
  Component: ComboboxBase,
  List: ComboboxList,
  Option: ComboboxOption,
} as ComboboxProps;

export { Combobox };
export type { ComboboxProps };
export default Combobox;
