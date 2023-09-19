import * as React from 'react';
import { Button } from '@sk-web-gui/button';
import { cx } from '@sk-web-gui/utils';
import MinusIcon from './assets/minus-icon';
import PlusIcon from './assets/plus-icon';
import { IDataObject, IMenu } from './side-menu';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
export interface IMenuExtended extends IMenu {
  itemData: any & IDataObject;
  activeId: string | number | null;
  openIds: string[];
  focusableId: string;
  focusedId: string;
  setOpenIds: React.Dispatch<React.SetStateAction<string[]>>;
  linkCallback: (data: IDataObject) => void;
  /* Closes non active trees in the menu. Default is true. */
  closeNoneActive: boolean;
  ariaExpanded: { open: string; close: string };
  ariaMoveButton?: string;
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
    activeId,
    openIds,
    focusableId,
    focusedId,
    setOpenIds,
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
    ariaMoveButton,
  } = props;
  const isActive = itemData.id === activeId;
  const open = openIds.some((x) => x === itemData.id.toString());
  const isFocusable = focusableId === itemData.id.toString();
  const hasFocus = focusedId === itemData.id.toString();

  const expandHandler = () => {
    setOpenIds((ids: string[]) =>
      ids.includes(itemData.id.toString())
        ? ids.filter((x) => x !== itemData.id.toString())
        : ids.concat([itemData.id.toString()])
    );
  };

  // send back onclick
  const linkCallbackhandler = () => {
    linkCallback(itemData);
  };

  const LabelRender = () => {
    return (
      <span className="sk-sidemenu-item-label">
        {renderMenuItemLabel ? renderMenuItemLabel(itemData, isActive) : label}
      </span>
    );
  };

  const LabelItem = ({ item }: { item: IDataObject }) => {
    const Comp: React.ElementType = item.path ? 'a' : 'button';

    if (separator) {
      return <div className="sk-sidemenu-item-separator" role="separator"></div>;
    }

    return (
      <Comp
        role="menuitem"
        className="sk-sidemenu-item-link"
        tabIndex={isFocusable ? 0 : !focusableId && isActive ? 0 : -1}
        autoFocus={hasFocus ? hasFocus : undefined}
        aria-current={isActive ? 'true' : undefined}
        aria-haspopup={subItems ? true : false}
        aria-expanded={subItems ? open : undefined}
        aria-disabled={disabled ? true : undefined}
        href={Comp === 'a' ? path : undefined}
        onClick={Comp === 'button' ? linkCallbackhandler : undefined}
      >
        <LabelRender />
      </Comp>
    );
  };

  const ExpandButton = () => {
    return (
      <>
        {subItems && (
          <button className="expand" onClick={expandHandler} aria-hidden={true} tabIndex={-1}>
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
    <li
      role="none"
      className={cx(
        'sk-sidemenu-item',
        'lvl-' + level,
        { open: open && subItems },
        { active: isActive },

        /** Below are specific for draggable */
        { separator: separator },
        { draggable: draggable },
        { 'moved-here': movedHere }
      )}
      data-id={id}
    >
      <div className={cx('sk-sidemenu-wrapper')}>
        {draggable && !separator && (
          /** Specific for draggable */
          <Button
            draggable={draggable}
            className={`sk-sidemenu-menuitem-movebutton`}
            variant="link"
            aria-hidden={true}
            tabIndex={-1}
            // aria-label={ariaMoveButton}
            // aria-disabled={disabled ? true : undefined}
            rightIcon={<DragIndicatorOutlinedIcon className="sk-sidemenu-menuitem-movebutton-icon !text-2xl" />}
          >
            {movedHere && <span className="sk-sidemenu-menuitem-movebutton-label">Flyttad</span>}
          </Button>
        )}
        {renderMenuItem ? (
          renderMenuItem(
            itemData,
            open,
            isActive,
            <>
              <LabelItem item={itemData} />
              <ExpandButton />
            </>
          )
        ) : (
          <>
            <LabelItem item={itemData} />
            <ExpandButton />
          </>
        )}
      </div>

      {subItems && (
        <ul className="items" role="menu" aria-label={`${label}-meny`}>
          {subItems.map((item) => (
            <MenuItem
              key={item.id}
              focusableId={focusableId}
              focusedId={focusedId}
              itemData={item}
              id={item.id}
              label={item.label}
              path={item.path}
              activeId={activeId}
              openIds={openIds}
              setOpenIds={setOpenIds}
              level={level + 1}
              subItems={item.subItems}
              linkCallback={linkCallback}
              closeNoneActive={closeNoneActive}
              disabled={item.disabled}
              ariaExpanded={ariaExpanded}
              ariaMoveButton={ariaMoveButton}
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
        </ul>
      )}
    </li>
  );
};
export default MenuItem;
