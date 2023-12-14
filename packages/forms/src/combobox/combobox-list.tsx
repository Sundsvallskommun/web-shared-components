import { DefaultProps, cx, getValidChildren, useForkRef } from '@sk-web-gui/utils';
import React, { useEffect, useState } from 'react';
import { useCombobox } from './combobox-context';

export interface ComboboxListProps extends DefaultProps, React.ComponentPropsWithRef<'fieldset'> {
  multiple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  value?: string | string[];
}

export const ComboboxList = React.forwardRef<HTMLFieldSetElement, ComboboxListProps>((props, ref) => {
  const [position, setPosition] = useState<'under' | 'over'>('under');

  const internalRef = React.useRef<HTMLFieldSetElement>(null);
  const { className, multiple: _multiple, size: _size, value: _value, children, ...rest } = props;

  const { total, setTotal, open, autofilter, ...context } = useCombobox();

  React.useEffect(() => {
    const handlePosition = () => {
      if (internalRef.current) {
        const positions = internalRef.current.parentElement?.getBoundingClientRect();
        if (positions) {
          if (window.innerHeight - positions.top < 280) {
            setPosition('over');
          } else {
            setPosition('under');
          }
        }
      }
    };

    handlePosition();
  }, [open]);

  React.useEffect(() => {
    if (_value !== undefined) {
      context.setValue && context.setValue(typeof _value === 'string' ? [_value] : _value);
    }
  }, [_value, context.setValue]);

  const size = _size || context.size || 'md';
  const multiple = _multiple !== undefined ? _multiple : context.multiple || false;

  const getFilteredChildren = () =>
    getValidChildren(children)
      .filter(
        (child) =>
          child.props.value?.toLowerCase().includes(context.searchValue?.toLowerCase()) ||
          child.props.children?.toLowerCase().includes(context.searchValue?.toLowerCase())
      )
      .map((child, index) =>
        React.cloneElement(child, { ...child.props, index: index, id: `${context.listId}-${index}` })
      );
  const getChildren = () =>
    autofilter
      ? getFilteredChildren()
      : getValidChildren(children).map((child, index) =>
          React.cloneElement(child, { ...child.props, index: index, id: `${context.listId}-${index}` })
        );

  useEffect(() => {
    setTotal && setTotal(React.Children.count(getChildren()));
  }, [context.searchValue, getChildren, setTotal]);

  return (
    <fieldset
      id={context.listId}
      ref={useForkRef(ref, internalRef)}
      className={cx(
        className,
        'sk-popup-menu-items',
        `sk-popup-menu-items-${size}`,
        'sk-form-combobox-list',
        open && total && total > 0 ? 'visible' : 'invisible'
      )}
      role="listbox"
      data-position={position}
      tabIndex={-1}
      aria-multiselectable={multiple}
      aria-hidden={!open}
      {...rest}
    >
      {getChildren()}
    </fieldset>
  );
});
