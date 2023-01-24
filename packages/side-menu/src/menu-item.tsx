import { Link } from '@sk-web-gui/link';
import { Button } from '@sk-web-gui/button';
import { cx } from '@sk-web-gui/utils';
import React, { useEffect, useState } from 'react';
import MinusIcon from './assets/MinusIcon';
import PlusIcon from './assets/PlusIcon';
import { IDataObject, IMenu } from './side-menu';

export interface IMenuExtended extends IMenu {
  itemData: any;
  active: string | number;
  linkCallback: (data: IDataObject) => void;
  /* Closes non active trees in the menu. Default is true. */
  closeNoneActive: boolean;
}

export const MenuItem = (props: IMenuExtended) => {
  const { itemData, id, label, path, level, subItems, linkCallback, active, closeNoneActive = true } = props;

  const [open, setOpen] = useState<boolean>(false);

  const expandHandler = () => {
    setOpenHandler(!open);
  };

  const setOpenHandler = (value: boolean) => {
    setOpen(value);
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

  useEffect(() => {
    if (hasActiveChild(itemData, active)) {
      setOpen(true);
    } else {
      if (closeNoneActive) {
        setOpen(false);
      }
    }
  }, [active]);

  // Setting grayscale depending on subitems and level
  let colorAndHeight;
  if (itemData.level > 2) {
    if (!itemData.subItems || itemData.subItems === null) {
      colorAndHeight = 'isLeafNode';
    } else if (itemData.subItems !== null) {
      colorAndHeight = 'isSubNode';
    }
  }

  return (
    <div
      className={cx('MenuItem', 'lvl-' + level, colorAndHeight, { open: subItems && open }, { active: active === id })}
    >
      <div className="wrapper">
        {path ? (
          <a className="MenuItem-link" href={path}>
            {label}
          </a>
        ) : (
          <button className="MenuItem-link" onClick={linkCallbackhandler}>
            {label}
          </button>
        )}

        {subItems && (
          <button className="expand" onClick={expandHandler}>
            <span>
              {open && <MinusIcon />}
              {!open && <PlusIcon />}
            </span>
          </button>
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
                // activeCallback={activeCallbackHandler}
                level={level + 1}
                subItems={item.subItems}
                linkCallback={linkCallback}
                closeNoneActive={closeNoneActive}
              />
            ))}
        </div>
      )}
    </div>
  );
};
