import { cx } from '@sk-web-gui/utils';
import React from 'react';

export interface ComboboxOptgroupProps extends React.ComponentPropsWithoutRef<'div'> {
  label?: string;
}

export const ComboboxOptgroup = React.forwardRef<HTMLDivElement, ComboboxOptgroupProps>((props, ref) => {
  const { label, className, children, ...rest } = props;

  return React.Children.count(children) > 0 ? (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className={cx('sk-form-combobox-list-option-group', className)}
      {...rest}
    >
      {label && (
        <label className="sk-form-combobox-list-option-group-label sk-popup-menu-item" aria-hidden>
          {label}
        </label>
      )}
      {children}
    </div>
  ) : (
    <></>
  );
});
