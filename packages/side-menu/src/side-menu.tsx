import { __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import { MenuItem } from './menu-item';
import { Spinner } from '@sk-web-gui/spinner';
import { Button } from '@sk-web-gui/button';
import EastIcon from '@mui/icons-material/East';
import { useState } from 'react';
export interface IDataObject {
  id: string | number;
  level: number;
  label: string;
  path?: string;
  separator?: boolean;
  disabled?: boolean;
  movedAway?: boolean;
  movedHere?: boolean;
  newItem?: boolean;
  error?: boolean;
  changes?: number;
}
export interface IMenu extends IDataObject {
  subItems?: Array<IMenu> | null | [];
}
export interface IMenuProps {
  menuData: Array<IMenu>;
  linkCallback: (data: IDataObject) => void;
  active: string | number;
  loading?: boolean;
  headElement?: React.ReactNode;
  label?: string;
  onDrop?: (data: IDataObject) => void;
  closeNoneActive?: boolean;
  labelCallback?: () => void;
  draggable?: boolean;
  className?: string;
  ariaExpanded?: { open: string; close: string };
}

export const SideMenu = React.forwardRef<HTMLDivElement, IMenuProps>((props, ref) => {
  const {
    loading,
    headElement,
    menuData,
    label,
    linkCallback,
    onDrop,
    active,
    closeNoneActive = true,
    labelCallback,
    draggable = false,
    className = '',
    ariaExpanded = { open: 'Visa undermeny', close: 'Dölj undermeny' },
  } = props;

  return (
    <nav className={`SideMenu ${className}`} ref={ref}>
      <div className="menu-header">
        {headElement && headElement}
        {label && (
          <div className="label-header">
            {labelCallback ? (
              <Button
                variant="light"
                rightIcon={<EastIcon className="material-icon label-button-icon" />}
                className="label-button label focus-visible:outline-white"
                onClick={labelCallback}
              >
                {label}
              </Button>
            ) : (
              <label>{label}</label>
            )}
          </div>
        )}
      </div>
      <div className="menu-body">
        {!loading &&
          menuData &&
          menuData.map((item) => {
            return (
              <MenuItem
                itemData={item}
                key={item.id}
                id={item.id}
                label={item.label}
                path={item.path}
                active={active}
                level={0}
                subItems={item.subItems}
                linkCallback={linkCallback}
                onDropCallback={onDrop}
                closeNoneActive={closeNoneActive}
                disabled={item.disabled}
                ariaExpanded={ariaExpanded}
                /** Below are specific for draggable */
                separator={item.separator}
                draggable={draggable}
                movedAway={item.movedAway}
                movedHere={item.movedHere}
                newItem={item.newItem}
                error={item.error}
                changes={item.changes}
              />
            );
          })}
        {loading && (
          <div className="py-20 flex justify-center w-full">
            <Spinner size="xl" />
          </div>
        )}
      </div>
    </nav>
  );
});
if (__DEV__) {
  SideMenu.displayName = 'Menu';
}
