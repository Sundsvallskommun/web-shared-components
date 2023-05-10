import { cx } from '@sk-web-gui/utils';
import React, { useEffect, useRef } from 'react';
import { TabMenuProps } from './tab-menu';
import { useTabMenuItemClass } from './styles';

export interface IMenuItem {
  id: string | number;
  label: string;
  path: string;
}

interface IMenuItemProps extends IMenuItem, Pick<TabMenuProps, 'variant' | 'tabAlign'> {
  onTabClick: (e: React.MouseEvent | React.KeyboardEvent) => void;
  render?: (element: JSX.Element, item: IMenuItem, index: number) => React.ReactNode;
  index: number;
  active: string | number;
  className?: string;
}

const TabItem = (props: IMenuItemProps) => {
  const { id, label, path, active, onTabClick, render, index, className, variant, tabAlign } = props;

  const focusRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (active === path) {
      focusRef.current && focusRef.current.focus();
    }
  }, []);

  const renderItem = (index: number) => {
    const element = (
      <a
        ref={focusRef}
        href={path}
        onKeyDown={onKeyDownHandler}
        role="menuitem"
        tabIndex={path === active ? undefined : -1}
      >
        {label}
      </a>
    );
    return render ? render(element, { id, label, path }, index) : element;
  };

  const onClickHandler = (event: React.MouseEvent | React.KeyboardEvent) => {
    if (typeof onTabClick !== undefined) {
      onTabClick(event);
    }
  };

  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onClickHandler(event);
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      const next = event.currentTarget?.parentElement?.nextSibling?.firstChild as HTMLElement;
      if (next) {
        next.focus();
      } else {
        const first = event.currentTarget.parentElement?.parentElement?.firstChild?.firstChild as HTMLElement;
        if (first) {
          first.focus();
        }
      }
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      const previous = event.currentTarget?.parentElement?.previousSibling?.firstChild as HTMLElement;
      if (previous) {
        previous.focus();
      } else {
        const last = event.currentTarget.parentElement?.parentElement?.lastChild?.firstChild as HTMLElement;
        if (last) {
          last.focus();
        }
      }
    }

    if (event.key === 'Home') {
      event.preventDefault();
      const first = event.currentTarget.parentElement?.parentElement?.firstChild?.firstChild as HTMLElement;
      if (first) {
        first.focus();
      }
    }

    if (event.key === 'End') {
      event.preventDefault();
      const last = event.currentTarget.parentElement?.parentElement?.lastChild?.firstChild as HTMLElement;
      if (last) {
        last.focus();
      }
    }
  };

  const itemClasses = useTabMenuItemClass({ variant, active, path, tabAlign });

  return (
    <li className={cx(className, itemClasses)} onClick={onClickHandler} role="none">
      {renderItem(index)}
    </li>
  );
};

export default TabItem;
