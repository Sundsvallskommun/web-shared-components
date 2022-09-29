import { DefaultProps } from "@sk-web-gui/theme";
import { cx, __DEV__ } from "@sk-web-gui/utils";
import * as React from "react";
import { MenuItem } from "./menu-item";
import { Select } from '@sk-web-gui/forms';
import ArrowIcon from "./assets/ArrowIcon";

export interface IMenu extends DefaultProps {
  id: string,
  level: number,
  element: () => JSX.Element
  subMenu: Array<IMenu> | null | []
}

interface ISelectMenu {
  id: string | number,
  label: string,
  value: string
}

export interface IMenuProps {
  selectMenuData?: Array<ISelectMenu>,
  loading?: boolean,
  menuData: Array<IMenu>,
  label: string,
  selectedMenu?: any,
  onMenuChange: (value: string) => void
}

export const Menu = React.forwardRef<HTMLDivElement, IMenuProps>((props, ref) => {
  const {
      selectedMenu,
      onMenuChange,
      menuData,
      label,
      selectMenuData,
    } = props;

    return (
     <nav className="Menu">
        <div className="menu-header">

          {selectMenuData &&
            <div className="select-header">
              <label>Avbildning</label>
              <Select         
                value={selectedMenu}
                onChange={onMenuChange}>
                {selectMenuData.map((item) => 
                  <option key={item.id} value={item.value}>{item.label}</option>  
                )}
              </Select>
            </div>
          }
          
          {label &&
            <div className="label-header">
              <label>
                {label}
              </label>
              
              {!selectMenuData && 
                <span>
                  <ArrowIcon />
                </span>
              }
            </div>
          } 
        </div>
        
        {menuData && menuData.map((item) =>
          <MenuItem 
            key={item.id} 
            id={item.id}
            element={item.element}
            level={0}
            subMenu={item.subMenu}
          /> 
        )}
     </nav>
    )
  }
);

if (__DEV__) {
  Menu.displayName = "Menu";
}
