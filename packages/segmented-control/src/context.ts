import React from 'react';
import { UseSegmentedControlProps } from './use-segmented-control';

export interface UseSegmentedControlContext extends UseSegmentedControlProps {
  /** Array of currently selected indices */
  selected?: number[];
  /** Toggle an item's selection state */
  toggleItem?: (index: number) => void;
  /** Currently focused item index (for keyboard navigation) */
  active?: number;
  /** Set the focused item index */
  setActive?: (index: number) => void;
  /** Total number of items */
  total?: number;
  size?: 'md' | 'lg';
  disabled?: boolean;
}

export const SegmentedControlContext = React.createContext<UseSegmentedControlContext>({});
