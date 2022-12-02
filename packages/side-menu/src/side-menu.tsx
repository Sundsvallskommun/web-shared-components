import { DefaultProps } from '@sk-web-gui/theme';
import { cx, __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import { MenuItem } from './menu-item';
import { Spinner } from '@sk-web-gui/spinner';
import { useEffect, useState } from 'react';
import { Button } from '@sk-web-gui/button';
import EastIcon from '@mui/icons-material/East';
export interface IDataObject extends DefaultProps {
  id: string | number;
  level: number;
  label: string;
  path?: string;
}
export interface IMenu extends DefaultProps, IDataObject {
  subItems?: Array<IMenu> | null | [];
}
export interface IMenuProps {
  loading?: boolean;
  headElement?: React.ReactNode;
  menuData: Array<IMenu>;
  label: string;
  linkCallback: (data: IDataObject) => void;
  active: string | number;
  closeNoneActive?: boolean;
  labelCallback?: () => void;
}
export const SideMenu = React.forwardRef<HTMLDivElement, IMenuProps>((props, ref) => {
  const { loading, headElement, menuData, label, linkCallback, active, closeNoneActive = true, labelCallback } = props;

  return (
    <nav className="SideMenu" ref={ref}>
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
          menuData.map((item) => (
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
              closeNoneActive={closeNoneActive}
            />
          ))}
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
