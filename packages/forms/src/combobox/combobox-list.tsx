import { DefaultProps, cx, getValidChildren, useForkRef, useOnElementOutside } from '@sk-web-gui/utils';
import React, { useState } from 'react';
import { useCombobox } from './combobox-context';
import { ComboboxOptgroup } from './combobox-optgroup';
import { ComboboxOption } from './combobox-option';

export interface ComboboxListProps extends DefaultProps, React.ComponentPropsWithRef<'fieldset'> {
  multiple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  value?: string | string[];
  /**
   * typeof Element used as Option element
   */
  optionType?: string | React.JSXElementConstructor<unknown>;
}

export const ComboboxList = React.forwardRef<HTMLFieldSetElement, ComboboxListProps>((props, ref) => {
  const [position, setPosition] = useState<'under' | 'over'>('over');

  const internalRef = React.useRef<HTMLFieldSetElement>(null);
  const { className, multiple: _multiple, size: _size, value: _value, children, optionType, ...rest } = props;

  const { total, setTotal, open, autofilter, sortSelectedFirst, setIds, ...context } = useCombobox();

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
      context.setValue?.(typeof _value === 'string' ? [_value] : _value);
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

  const getFilteredChildren = (children: React.ReactNode, groupIndex?: number) =>
    getValidChildren(children)
      .filter((child) => child.type === ComboboxOption || typeof child.type === optionType)
      .sort(sortSelected)
      .filter((child) =>
        autofilter
          ? child.props.value?.toLowerCase().includes(context.searchValue?.toLowerCase()) ||
            child.props.children?.toLowerCase().includes(context.searchValue?.toLowerCase())
          : true
      )
      .map((child, index) =>
        React.cloneElement(child, {
          ...child.props,
          id: `${context.listId}-${groupIndex ? `${groupIndex}-` : ''}${index}`,
        })
      );

  const getOptionsAndGroups = () => {
    const options = getFilteredChildren(children);
    const groups = getValidChildren(children)
      .filter((child) => child.type === ComboboxOptgroup)
      .map((group, index) => {
        return React.cloneElement(group, {
          ...group.props,
          children: getFilteredChildren(group.props.children, index + 1),
        });
      });

    return [...options, ...groups];
  };

  const options = React.useMemo(() => {
    return getOptionsAndGroups();
  }, [context.searchValue, open]);

  React.useEffect(() => {
    if (setTotal && setIds && options) {
      const allFlat = options.map((opt) => (opt.type === ComboboxOptgroup ? opt.props.children : opt)).flat();
      const ids = allFlat.map((child) => child.props.id);
      const count = React.Children.count(allFlat);
      setIds(ids);
      setTotal(count);
    }
  }, [options, setTotal, setIds]);

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
