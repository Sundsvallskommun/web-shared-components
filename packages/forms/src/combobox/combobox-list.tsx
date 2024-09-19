import { DefaultProps, cx, getValidChildren, useForkRef, useOnElementOutside } from '@sk-web-gui/utils';
import React, { useEffect, useState } from 'react';
import { useCombobox } from './combobox-context';

export interface ComboboxListProps extends DefaultProps, React.ComponentPropsWithRef<'fieldset'> {
  multiple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  value?: string | string[];
}

export const ComboboxList = React.forwardRef<HTMLFieldSetElement, ComboboxListProps>((props, ref) => {
  const [position, setPosition] = useState<'under' | 'over'>('over');

  const internalRef = React.useRef<HTMLFieldSetElement>(null);
  const { className, multiple: _multiple, size: _size, value: _value, children, ...rest } = props;

  const { total, setTotal, open, autofilter, sortSelectedFirst, ...context } = useCombobox();

  useOnElementOutside(
    internalRef,
    ({ isOutsideBottom }) => {
      setPosition(isOutsideBottom ? 'over' : 'under');
    },
    [open],
    { padding: 20 }
  );

  React.useEffect(() => {
    if (_value !== undefined) {
      context.setValue && context.setValue(typeof _value === 'string' ? [_value] : _value);
    }
  }, [_value, context.setValue]);

  const size = _size || context.size || 'md';
  const multiple = _multiple !== undefined ? _multiple : context.multiple || false;

  const sortSelected = (a: React.ReactElement, b: React.ReactElement) => {
    if (!sortSelectedFirst) return 0;

    const achecked =
      a.props.checked !== undefined
        ? a.props.checked
        : context?.value?.length > 0
          ? context?.value.includes(a.props.value)
          : false;
    const bchecked =
      b.props.checked !== undefined
        ? b.props.checked
        : context?.value?.length > 0
          ? context?.value.includes(b.props.value)
          : false;
    return achecked && !bchecked ? -1 : bchecked && !achecked ? 1 : 0;
  };
  const getFilteredChildren = () =>
    getValidChildren(children)
      .sort(sortSelected)
      .filter(
        (child) =>
          child.props.value?.toLowerCase().includes(context.searchValue?.toLowerCase()) ||
          child.props.children?.toLowerCase().includes(context.searchValue?.toLowerCase())
      )
      .map((child, index) =>
        React.cloneElement(child, { ...child.props, index: index, id: `${context.listId}-${index}` })
      );

  const options = React.useMemo(() => {
    return autofilter
      ? getFilteredChildren()
      : getValidChildren(children)
          .sort(sortSelected)
          .map((child, index) =>
            React.cloneElement(child, { ...child.props, index: index, id: `${context.listId}-${index}` })
          );
  }, [context.searchValue, open]);

  useEffect(() => {
    setTotal && setTotal(React.Children.count(options));
  }, [context.searchValue, options, setTotal]);

  return (
    <fieldset
      id={context.listId}
      ref={useForkRef(ref, internalRef)}
      className={cx(className, 'sk-popup-menu', `sk-popup-menu-${size}`, 'sk-form-combobox-list')}
      data-open={open && total && total > 0}
      role="listbox"
      data-position={position}
      tabIndex={-1}
      aria-multiselectable={multiple}
      aria-hidden={!open}
      {...rest}
    >
      {options}
    </fieldset>
  );
});
