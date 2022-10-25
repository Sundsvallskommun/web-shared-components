import { DefaultProps } from "@sk-web-gui/theme";
import { cx, __DEV__ } from "@sk-web-gui/utils";
import * as React from "react";
import { MenuItem } from "./menu-item";
import { Spinner } from '@sk-web-gui/spinner';
import { useEffect, useState } from "react";
export interface IDataObject extends DefaultProps {
  id: string | number
  level: number
  label: string
  path?: string
}
export interface IMenu extends DefaultProps, IDataObject {
  subItems?: Array<IMenu> | null | []
}
export interface IMenuProps {
  loading?: boolean
  headElement: React.ReactNode
  menuData: Array<IMenu>
  selectedId: number
  label: string
  linkCallback: (data: IDataObject) => void
  active: string | number
}
export const SideMenu = React.forwardRef<HTMLDivElement, IMenuProps>((props, ref) => {
  const {
      loading,
      headElement,
      menuData,
      label,
      linkCallback,
      active
    } = props;
    const linkCallbackHandler = (menuData: IDataObject) => {
      linkCallback(menuData)
    }
    const activeCallbackHandler = () => {
      // Void
    }
    return (
     <nav className="SideMenu">
        <div className="menu-header">
          {headElement &&
            headElement
          }
          {label &&
            <div className="label-header">
              <label>
                {label}
              </label>
            </div>
          }
        </div>
        {!loading && menuData && menuData.map((item) =>
          <MenuItem
            key={item.id}
            id={item.id}
            label={item.label}
            path={item.path}
            active={active}
            activeCallback={activeCallbackHandler}
            level={0}
            subItems={item.subItems}
            linkCallback={linkCallbackHandler}
          />
        )}
        {loading && <div className="py-20 flex justify-center w-full"><Spinner size="xl" /></div>}
     </nav>
    )
  }
);
if (__DEV__) {
  SideMenu.displayName = "Menu";
}