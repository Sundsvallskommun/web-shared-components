import * as React from 'react';
import { Button } from '@sk-web-gui/button';
import { cx } from '@sk-web-gui/utils';
import MinusIcon from './assets/minus-icon';
import PlusIcon from './assets/plus-icon';
import { IDataObject, IMenu } from './side-menu';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
export interface IMenuExtended extends IMenu {
  itemData: any;
  active: string | number;
  linkCallback: (data: IDataObject) => void;
  /* Closes non active trees in the menu. Default is true. */
  closeNoneActive: boolean;
  ariaExpanded: { open: string; close: string };
  draggable?: boolean;
  renderMenuItem?: (
    data: IDataObject,
    open: boolean,
    active: boolean,
    defaultElement: React.ReactNode
  ) => React.ReactNode;
  renderMenuItemLabel?: (data: IDataObject, active: boolean) => React.ReactNode;
  renderMenuItemExpand?: (data: IDataObject, active: boolean, defaultElement: React.ReactNode) => React.ReactNode;
}

export const MenuItem = (props: IMenuExtended) => {
  const {
    itemData,
    id,
    label,
    path,
    level,
    subItems,
    linkCallback,
    active,
    closeNoneActive = true,
    ariaExpanded,
    disabled = false,
    renderMenuItem,
    renderMenuItemLabel,
    renderMenuItemExpand,
    /* Below at draggable specific */
    draggable = false,
    separator = false,
    movedHere = false,
  } = props;

  const [open, setOpen] = React.useState<boolean>(false);

  const expandHandler = () => {
    setOpen((open: boolean) => !open);
  };

  // send back onclick
  const linkCallbackhandler = () => {
    linkCallback(itemData);
  };

  const hasActiveChild = (item: IMenu, activeId: number | string): boolean => {
    if (item.id === activeId) {
      return true;
    } else if (item.subItems && item.subItems.length > 0) {
      return item.subItems.some((subItem: IMenu) => {
        return hasActiveChild(subItem, activeId);
      });
    }
    return false;
  };

  React.useEffect(() => {
    if (hasActiveChild(itemData, active)) {
      setOpen(true);
    } else {
      if (closeNoneActive) {
        setOpen(false);
      }
    }
  }, [active]);

  const getLabel = () => {
    return (
      <span className="menu-item-label">
        {renderMenuItemLabel ? renderMenuItemLabel(itemData, active == id) : label}
      </span>
    );
  };

  const getLabelItemType = (item: IDataObject) => {
    if (item.path) {
      return (
        <a className="menu-item-link" href={path} aria-disabled={disabled ? true : undefined}>
          {getLabel()}
        </a>
      );
    }
    if (separator) {
      return <div className="menu-item-separator"></div>;
    }
    return (
      <button className="menu-item-link" onClick={linkCallbackhandler} aria-disabled={disabled ? true : undefined}>
        {getLabel()}
      </button>
    );
  };

  const getExpandButton = () => {
    return (
      <>
        {subItems && (
          <button
            className="expand"
            onClick={expandHandler}
            aria-expanded={open}
            aria-disabled={disabled ? true : undefined}
            aria-label={open ? ariaExpanded.close : ariaExpanded.open}
          >
            <span className="expand-button">
              {renderMenuItemExpand ? (
                renderMenuItemExpand(
                  itemData,
                  open,
                  <>
                    {open && <MinusIcon />}
                    {!open && <PlusIcon />}
                  </>
                )
              ) : (
                <>
                  {open && <MinusIcon />}
                  {!open && <PlusIcon />}
                </>
              )}
            </span>
          </button>
        )}
      </>
    );
  };

  return (
    <div
      className={cx(
        'menu-item',
        'lvl-' + level,
        { open: open && subItems },
        { active: active === id },

        /** Below are specific for draggable */
        { separator: separator },
        { draggable: draggable },
        { 'moved-here': movedHere }
      )}
      data-id={id}
    >
      <div className={cx('wrapper')}>
        {draggable && !separator && (
          /** Specific for draggable */
          <Button
            draggable={draggable}
            className={`menu-item-move-button`}
            variant="link"
            aria-disabled={disabled ? true : undefined}
            rightIcon={<DragIndicatorOutlinedIcon className="menu-item-move-button-icon !text-2xl" />}
          >
            {movedHere && <span className="menu-item-move-button-label">Flyttad</span>}
          </Button>
        )}
        {renderMenuItem ? (
          renderMenuItem(
            itemData,
            open,
            active == id,
            <>
              {getLabelItemType(itemData)}
              {getExpandButton()}
            </>
          )
        ) : (
          <>
            {getLabelItemType(itemData)}
            {getExpandButton()}
          </>
        )}
      </div>

      {open && (
        <div className="items">
          {subItems &&
            subItems.map((item) => (
              <MenuItem
                itemData={item}
                key={item.id}
                id={item.id}
                label={item.label}
                path={item.path}
                active={active}
                level={level + 1}
                subItems={item.subItems}
                linkCallback={linkCallback}
                closeNoneActive={closeNoneActive}
                disabled={item.disabled}
                ariaExpanded={ariaExpanded}
                newItem={item.newItem}
                renderMenuItem={renderMenuItem}
                renderMenuItemLabel={renderMenuItemLabel}
                renderMenuItemExpand={renderMenuItemExpand}
                /** Below are specific for draggable */
                separator={item.separator}
                draggable={draggable}
                movedHere={item.movedHere}
                error={item.error}
                changes={item.changes}
              />
            ))}
        </div>
      )}
    </div>
  );
};
