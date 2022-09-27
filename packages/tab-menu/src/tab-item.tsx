
import * as React from 'react';
import { cx, __DEV__ } from '@sk-web-gui/utils';

export interface IMenuItem {
    id: string | number,
    active?: string | number,
    element: any // I dont understand what type typescript want me to set here.

  }

const TabItem = (props: IMenuItem) => {
    const {
        id,
        element,
        active
    } = props

    return (
        <li className={cx("TabItem", {"active": active === id})}>
            {element}
        </li>
    );
};

export default TabItem