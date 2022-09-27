import { cx } from '@sk-web-gui/utils';
import React, { useState } from 'react'
import MinusIcon from './assets/MinusIcon';
import PlusIcon from './assets/PlusIcon';
import { IMenu } from './menu'
import useUnmountDelay from './delay-unmounting';


export const MenuItem = (props: IMenu) => {
  const {
    id,
    element,
    level,
    subMenu,
  } = props;

  const transitionTime = 0 // ms  
  const [open, setOpen] = useState<boolean>(false)

  const delayComponent = useUnmountDelay(open, transitionTime)

  const expandHandler = () => {
    setOpenHandler(!open)
  }
  
  const setOpenHandler = (value: boolean) => {
    setOpen(value)
  }
  

  return (
    <>
      <div className="MenuItem">
        <div className={cx('wrapper', 'lvl-' + level, {open: open})}>
          <>
            {element}

            {subMenu && 
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
          </>
        </div>
      </div>
      {delayComponent && subMenu && subMenu.map((item) => 
        <MenuItem 
        key={item.id}
        id={item.id}
        element={item.element}
        level={level + 1}
        subMenu={item.subMenu}
        /> 
      )}
    </>
  )
}