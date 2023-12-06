import React from 'react';

export interface UseComboboxProps {
  multiple?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  /**
   * Automatic filter options by value and label (children)
   * @default true
   */
  autofilter?: boolean;
}

interface UseComboboxData extends UseComboboxProps {
  active?: number;
  total: number;
  next?: () => void;
  prev?: () => void;
  setTotal?: (total: number) => void;
  select?: (value: string) => void;
  remove?: (value: string) => void;
  close?: () => void;
  addLabel?: (label: string, value: string) => void;
  labels?: Record<string, string>;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  setValue?: (value: string[]) => void;
  id?: string;
  listId?: string;
  name?: string;
  value: string[];
  searchValue?: string;
  focusInput?: () => void;
}

export const ComboboxContext = React.createContext<UseComboboxData>({ value: [], total: 0 });

export const useCombobox = () => React.useContext(ComboboxContext);
