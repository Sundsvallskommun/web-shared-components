import { Link } from '@sk-web-gui/link';
import { Button } from '@sk-web-gui/button';
import { cx } from '@sk-web-gui/utils';
import React, { useEffect, useState } from 'react';
import MinusIcon from './assets/MinusIcon';
import PlusIcon from './assets/PlusIcon';
import { IDataObject, IMenu } from './side-menu';
//import useUnmountDelay from './delay-unmounting';

export interface IMenuExtended extends IMenu {
  itemData: any;
  active: string | number;
  linkCallback: (data: IDataObject) => void;
  activeCallback: () => void;
}

export const MenuItem = (props: IMenuExtended) => {
  const { itemData, id, label, path, level, subItems, linkCallback, active, activeCallback } = props;

  const [open, setOpen] = useState<boolean>(false);

  //const transitionTime = 0 // ms
  //const delayComponent = useUnmountDelay(open, transitionTime)

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

  // Child is open
  const activeCallbackHandler = () => {
    setOpen(true);
    activeCallback();
  };

  // Current item is active
  useEffect(() => {
    if (active === id) {
      setOpen(true);
      activeCallback();
    }
  }, [active]);

  //setting grayscale depending on subitems and level

  let color;
  if (itemData.level > 2) {
    if (!itemData.subItems || itemData.subItems === null) {
      color = 'background-darkerGrey';
    } else if (itemData.subItems !== null) {
      color = 'background-lightGrey';
    }
  } else if (itemData.level == 2) {
    color = 'white';
  }

  return (
    <div className={cx('MenuItem', 'lvl-' + level, color, { open: subItems && open }, { active: active === id })}>
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
                activeCallback={activeCallbackHandler}
                level={level + 1}
                subItems={item.subItems}
                linkCallback={linkCallback}
              />
            ))}
        </div>
      )}
    </div>
  );
};
