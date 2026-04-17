import { DefaultProps, __DEV__, cx, getValidChildren } from '@sk-web-gui/utils';
import React from 'react';
import { SegmentedControlContext } from './context';
import { SegmentedControlItemProps } from './segmented-control-item';

export interface SegmentedControlComponentProps
  extends DefaultProps,
    Omit<React.ComponentPropsWithRef<'ul'>, 'defaultValue' | 'onChange'> {
  /** Array of selected indices (controlled mode) */
  value?: number[];
  /** Array of initially selected indices (uncontrolled mode) */
  defaultValue?: number[];
  /** Callback when selection changes */
  onChange?: (selected: number[]) => void;
  /** Disable all items */
  disabled?: boolean;
  /** Enables multi select */
  multiSelect?: boolean;
  /** Size variant */
  size?: 'md' | 'lg';
}

export const SegmentedControlComponent = React.forwardRef<HTMLUListElement, SegmentedControlComponentProps>(
  (props, ref) => {
    const {
      className,
      children,
      value,
      defaultValue,
      onChange,
      id: _id,
      disabled = false,
      size = 'lg',
      multiSelect = false,
      ...rest
    } = props;

    const [internalSelected, setInternalSelected] = React.useState<number[]>(defaultValue || []);
    const isControlled = value !== undefined;
    const selected = isControlled ? value : internalSelected;

    const [active, setActive] = React.useState<number>(0);

    const autoId = React.useId();
    const id = _id || `sk-segmentedcontrol-${autoId}`;

    const total = React.Children.count(children);

    const toggleItem = (index: number) => {
      
      if (disabled) return;

      const newSelected = !multiSelect ? [index] : selected.includes(index) ? selected.filter((i) => i !== index) : [...selected, index];

      if (!isControlled) {
        setInternalSelected(newSelected);
      }
      onChange?.(newSelected);
    };

    const context = {
      selected,
      toggleItem,
      active,
      setActive,
      total,
      size,
      disabled,
    };

    const validChildren = getValidChildren<SegmentedControlItemProps>(children);
    const menuItems = validChildren.map((child, index) => {
      const itemProps = { ...child.props, menuIndex: index };
      return React.cloneElement(child, itemProps);
    });

    return (
      <SegmentedControlContext.Provider value={context}>
        <ul id={id} role="toolbar" ref={ref} className={cx('sk-segmentedcontrol', className)} data-size={size} {...rest}>
          {menuItems}
        </ul>
      </SegmentedControlContext.Provider>
    );
  }
);

if (__DEV__) {
  SegmentedControlComponent.displayName = 'SegmentedControl';
}

export default SegmentedControlComponent;
