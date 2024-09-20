import { CustomOnChangeEvent } from '@sk-web-gui/utils';
import React from 'react';

export interface UseComboboxProps {
  multiple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /**
   * @default primary
   */
  variant?: 'primary' | 'tertiary';
  /**
   * Automatic filter options by value and label (children)
   * @default true
   */
  autofilter?: boolean;
  /**
   * Show selected first in list
   * @default true
   */
  sortSelectedFirst?: boolean;
  /**
   * Placeholder when search is active
   */
  searchPlaceholder?: string;
  /**
   * Placeholder when no value is selected
   */
  placeholder?: string;
  /**
   * Search input value
   */
  searchValue?: string;
  /**
   * ChangeEvent list
   */
  onChange?: (event: CustomOnChangeEvent) => void;
  /**
   * ChangeEvent list
   */
  onSelect?: (event: CustomOnChangeEvent) => void;
  /**
   * ChangeEvent list
   */
  onChangeSearch?: (event: CustomOnChangeEvent<string>) => void;
  /**
   * Selected value
   */
  value?: string | string[];
  /**
   * Sets initial value
   */
  defaultValue?: string | string[];
}

interface UseComboboxData extends UseComboboxProps {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  activeId?: string;
  setIds?: (ids: string[]) => void;
  total: number;
  next: () => void;
  prev: () => void;
  setTotal: (total: number) => void;
  select: (value: string) => void;
  remove: (value: string) => void;
  close: () => void;
  addLabel: (label: string, value: string) => void;
  labels: Record<string, string>;
  open: boolean;
  setOpen: (open: boolean) => void;
  setValue: (value: string[]) => void;
  getValue: () => string;
  id: string;
  listId: string;
  name: string;
  value: string[];
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  focusInput: () => void;
  inputRef: React.Ref<HTMLInputElement | null | undefined> | null;
}

export const ComboboxContext = React.createContext<UseComboboxData>({
  value: [],
  total: 0,
  active: 0,
  setActive: () => ({}),
  next: () => ({}),
  prev: () => ({}),
  setTotal: () => ({}),
  select: () => ({}),
  remove: () => ({}),
  close: () => ({}),
  addLabel: () => ({}),
  labels: {},
  open: false,
  setOpen: () => ({}),
  setValue: ([]) => ({}),
  getValue: () => '',
  id: '',
  listId: '',
  name: '',
  searchValue: '',
  setSearchValue: () => ({}),
  focusInput: () => ({}),
  inputRef: null,
});

export const useCombobox = () => React.useContext(ComboboxContext);
