
import * as React from 'react';
import { cx, __DEV__ } from '@sk-web-gui/utils';

export interface IMenuItem {
    id: string | number
    label: string
    path: string
    active?: string | number
    onTabClick: (path: string, id: string | number) => void
}

const TabItem = (props: IMenuItem) => {
    const {
        id,
        label,
        path,
        active,
        onTabClick
    } = props

    const onClickHandler = () => {
        onTabClick(path, id)
    }

    return (
        <ul className={cx("TabItem", {"active": active === path})} onClick={onClickHandler}>
            <a>{label}</a>
        </ul>
    );
};

export default TabItem