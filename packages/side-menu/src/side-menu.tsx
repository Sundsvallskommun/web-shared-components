import { DefaultProps } from "@sk-web-gui/theme";
import { cx, __DEV__ } from "@sk-web-gui/utils";
import * as React from "react";
import { MenuItem } from "./menu-item";

export interface IDataObject extends DefaultProps {
  id: string | number
  level: number
  label: string
  path: string
}

export interface IMenu extends DefaultProps, IDataObject {
  subItems?: Array<IMenu> | null | []
  linkCallback: (data: IDataObject) => void
  active: string | number
  activeCallback: () => void
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
      headElement,
      menuData,
      label,
      linkCallback,
      active
    } = props;


    const linkCallbackHandler = (data: IDataObject) => {
      linkCallback(data)
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
        
        {menuData && menuData.map((item) =>
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
     </nav>
    )
  }
);

if (__DEV__) {
  SideMenu.displayName = "Menu";
}
