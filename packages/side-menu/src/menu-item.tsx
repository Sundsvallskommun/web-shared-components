import { Button } from '@sk-web-gui/button';
import { cx } from '@sk-web-gui/utils';

import { useEffect, useRef, useState } from 'react';
import MinusIcon from './assets/MinusIcon';
import PlusIcon from './assets/PlusIcon';
import { IDataObject, IMenu } from './side-menu';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import SparkleIcon from './assets/SparkleIcon';

export interface IMenuExtended extends IMenu {
  itemData: any;
  active: string | number;
  linkCallback: (data: IDataObject) => void;
  /* Closes non active trees in the menu. Default is true. */
  closeNoneActive: boolean;
  ariaExpanded: { open: string; close: string };
  draggable?: boolean;
  onDropCallback?: (data: IDataObject) => void;
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
    /* Below at draggable specific */
    draggable = false,
    separator = false,
    movedAway = false,
    movedHere = false,
    newItem = false,
    error,
    changes,
  } = props;
  const dragRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  const expandHandler = () => {
    if (!movedAway) {
      setOpen((open: boolean) => !open);
    }
  };

  // send back onclick
  const linkCallbackhandler = () => {
    if (!movedAway) {
      linkCallback(itemData);
    }
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
    if (hasActiveChild(itemData, active) && !movedAway) {
      setOpen(true);
    } else {
      if (closeNoneActive) {
        setOpen(false);
      }
    }
  }, [active]);

  const getLabel = () => {
    return (
      <>
        {draggable && error && !movedAway && <ErrorOutlinedIcon className="MenuItem-error !text-xl" />}
        <span className="MenuItem-label">
          {label}
          {newItem && <SparkleIcon />}
        </span>
        {draggable && changes && changes > 0 && !movedAway && (
          <span className="MenuItem-changes">{`${changes > 9 ? '9+' : changes}`}</span>
        )}
      </>
    );
  };

  const getLabelItemType = (item: IDataObject) => {
    if (item.path) {
      return (
        <a className="MenuItem-link" href={path} aria-disabled={disabled || movedAway ? true : undefined}>
          {getLabel()}
        </a>
      );
    }
    if (separator) {
      return <div className="MenuItem-separator"></div>;
    }
    return (
      <button
        className="MenuItem-link"
        onClick={linkCallbackhandler}
        aria-disabled={disabled || movedAway ? true : undefined}
      >
        {getLabel()}
      </button>
    );
  };

  return (
    <div
      ref={dragRef}
      className={cx(
        'MenuItem',
        'lvl-' + level,
        { open: open },
        { active: active === id },

        /** Below are specific for draggable */
        { separator: separator },
        { draggable: draggable },
        { movedAway: movedAway },
        { movedHere: movedHere },
        { newItem: newItem }
      )}
      data-id={id}
    >
      <div className={cx('wrapper')}>
        {draggable && !separator && !movedAway && (
          /** Specific for draggable */
          <Button
            draggable={draggable}
            className={`MenuItem-moveButton`}
            variant="link"
            aria-disabled={disabled || movedAway ? true : undefined}
            rightIcon={<DragIndicatorOutlinedIcon className="MenuItem-moveButtonIcon !text-2xl" />}
          >
            {movedHere && <span className="MenuItem-moveButtonLabel">Flyttad</span>}
          </Button>
        )}
        {getLabelItemType(itemData)}

        {subItems && (
          <button
            className="expand"
            onClick={expandHandler}
            aria-expanded={open}
            aria-disabled={disabled || movedAway ? true : undefined}
            aria-label={open ? ariaExpanded.close : ariaExpanded.open}
          >
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
                level={level + 1}
                subItems={item.subItems}
                linkCallback={linkCallback}
                closeNoneActive={closeNoneActive}
                disabled={item.disabled}
                ariaExpanded={ariaExpanded}
                newItem={item.newItem}
                /** Below are specific for draggable */
                separator={item.separator}
                draggable={draggable}
                movedAway={item.movedAway}
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
