import React from 'react';

export interface UseComboboxProps {
  multiple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /**
   * Automatic filter options by value and label (children)
   * @default true
   */
  autofilter?: boolean;
}

interface UseComboboxData extends UseComboboxProps {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
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
  id: '',
  listId: '',
  name: '',
  searchValue: '',
  setSearchValue: () => ({}),
  focusInput: () => ({}),
  inputRef: null,
});

export const useCombobox = () => React.useContext(ComboboxContext);
