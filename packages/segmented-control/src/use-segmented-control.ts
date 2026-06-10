import React from 'react';
import { SegmentedControlContext } from './context';

export interface UseSegmentedControlProps {
  /** Array of selected indices (controlled) */
  value?: number[];
  /** Array of initially selected indices (uncontrolled) */
  defaultValue?: number[];
  size?: 'md' | 'lg';
}

export const useSegmentedControl = () => React.useContext(SegmentedControlContext);
