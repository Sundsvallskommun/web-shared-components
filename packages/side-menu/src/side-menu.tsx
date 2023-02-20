import { __DEV__ } from '@sk-web-gui/utils';
import * as React from 'react';
import { MenuItem } from './menu-item';
import { Spinner } from '@sk-web-gui/spinner';
import { Button } from '@sk-web-gui/button';
import EastIcon from '@mui/icons-material/East';
import { useEffect } from 'react';
import { Draggable } from './Draggable';

export interface IDataObject {
  id: string | number;
  level: number;
  label: string;
  path?: string;
  disabled?: boolean;
  /* Below at draggable specific */
  separator?: boolean;
  movedAway?: boolean;
  movedHere?: boolean;
  newItem?: boolean;
  error?: boolean;
  changes?: number;
}
export interface IMenu extends IDataObject {
  subItems?: Array<IMenu> | null | [];
}

interface CommonProps {
  menuData: Array<IMenu>;
  linkCallback: (data: IDataObject) => void;
  active: string | number;
  loading?: boolean;
  headElement?: React.ReactNode;
  label?: string;
  closeNoneActive?: boolean;
  labelCallback?: () => void;
  className?: string;
  ariaExpanded?: { open: string; close: string };
  onDrop?: (draggedItem: IMenu, newParent: IMenu) => void;
}

interface IMenuPropsRegular extends CommonProps {
  draggable?: false;
}

interface IMenuPropsDraggable extends CommonProps {
  draggable: true;
  onDrop: (draggedItem: IMenu, newParent: IMenu) => void;
}

export type IMenuProps = IMenuPropsRegular | IMenuPropsDraggable;

export const SideMenu = React.forwardRef<HTMLDivElement, IMenuProps>((props, ref) => {
  const {
    loading,
    headElement,
    menuData,
    label,
    linkCallback,
    active,
    closeNoneActive = true,
    labelCallback,
    className = '',
    ariaExpanded = { open: 'Visa undermeny', close: 'Dölj undermeny' },
    draggable = false,
  } = props;
  const internalRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(ref, () => internalRef.current);

  const handleDrop = (draggedItem: IMenu, newParent: IMenu) => {
    draggable && props.onDrop && props.onDrop(draggedItem, newParent);
  };

  useEffect(() => {
    let draggables: InstanceType<typeof Draggable>;
    if (internalRef) {
      if (draggable && internalRef) {
        draggables = new Draggable(internalRef.current as HTMLDivElement, menuData, handleDrop);
      }
    }
    return () => {
      if (draggables) {
        draggables.destroy();
      }
    };
  }, []);

  return (
    <nav className={`side-menu ${className}`} ref={internalRef}>
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
