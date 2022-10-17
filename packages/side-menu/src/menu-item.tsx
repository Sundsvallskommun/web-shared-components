import { cx } from '@sk-web-gui/utils';
import React, { useEffect, useState } from 'react'
import MinusIcon from './assets/MinusIcon';
import PlusIcon from './assets/PlusIcon';
import { IDataObject, IMenu } from './side-menu'
//import useUnmountDelay from './delay-unmounting';

export interface IMenuExtended extends IMenu {
  active: string | number
  linkCallback: (data: IDataObject) => void
  activeCallback: () => void
}

export const MenuItem = (props: IMenuExtended) => {
  const {
    id,
    label,
    path,
    level,
    subItems,
    linkCallback,
    active,
    activeCallback,
  } = props;

  const [open, setOpen] = useState<boolean>(false)
  
  //const transitionTime = 0 // ms  
  //const delayComponent = useUnmountDelay(open, transitionTime)

  const expandHandler = () => {
    setOpenHandler(!open)
  }
  
  const setOpenHandler = (value: boolean) => {
    setOpen(value)
  }

  // send back onclick
  const linkCallbackhandler = () => {
    linkCallback({
      id: id,
      label: label,
      level: level,
      path: path,
    })
  }

  // Child is open 
  const activeCallbackHandler = () => {
    setOpen(true)
    activeCallback()
  }

  // Current item is active
  useEffect(() => {
    if(active === id) {
      setOpen(true)
      activeCallback()
    }
  }, [active])



  return (
    <>
      <div className={cx("MenuItem", 'lvl-' + level, {open: subItems && open}, {active: active === id})}>
          <div className="wrapper">
            <div onClick={linkCallbackhandler}>
              <a>
                {label}
              </a>
            </div>
            
            {subItems && 
              <button className="expand" onClick={expandHandler}>
                <span>
                  {open && 
                    <MinusIcon />
                  }
                  {!open && 
                    <PlusIcon />
                  }
                </span>
              </button>
            }
          </div>

          <div className="items">
            {subItems && subItems.map((item) => 
              <MenuItem 
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
            )}
          </div>
      </div>
    </>
  )
}