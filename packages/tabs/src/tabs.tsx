import { Badge, BadgeProps } from '@sk-web-gui/badge';
import { DefaultProps, __DEV__, cx } from '@sk-web-gui/utils';
import * as React from 'react';
import { useTabsIconClass, useTabsListClass, useTabsTabClass, useTabsWrapperClass } from './styles';

export interface TabItem {
  id: string | number;
  label: string;
  children: React.ReactNode;
  icon?: JSX.Element;
  alert?: boolean | number;
  disabled?: boolean;
}

type alertSettings = Pick<BadgeProps, 'size' | 'position' | 'color' | 'variant' | 'max' | 'noBorder' | 'className'>;

interface ITabsProps extends Omit<DefaultProps, 'children'> {
  /* Set active tab */
  activeIndex?: number;
  onTabClick?: (event: React.MouseEvent, item: TabItem, index: number) => void;
  onTabChange?: (item: TabItem) => void;
  /* Defaults to left */
  tabAlign?: 'left' | 'right' | 'center' | 'stretch';
  /* React node */
  children?: React.ReactNode;
  tabs: TabItem[];
  listClassName?: string;
  tabClassName?: string;
  panelClassName?: string;
  hideIcon?: boolean;
  hideLabel?: boolean;
  hideLine?: boolean;
  alertSettings?: alertSettings;
  variant?: 'default' | 'headermenu';
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement>, ITabsProps {}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  const {
    className,
    activeIndex: _activeIndex,
    hideLine: _hideLine,
    tabAlign = 'left',
    listClassName,
    tabClassName,
    panelClassName,
    tabs,
    hideIcon,
    hideLabel,
    alertSettings,
    onTabClick,
    onTabChange,
    variant = 'default',
    ...rest
  } = props;

  const hideLine = _hideLine !== undefined ? _hideLine : variant === 'headermenu' ? true : false;

  const firstActive = typeof _activeIndex === 'number' ? _activeIndex : tabs.findIndex((tab) => !tab.disabled);

  const [activeIndex, setActiveIndex] = React.useState(firstActive);

  const initialFocus = React.useRef<HTMLButtonElement>(null);

  const setInitialFocus = () => {
    setTimeout(() => {
      initialFocus?.current && initialFocus.current.focus();
    });
  };

  React.useEffect(() => {
    setInitialFocus();
  }, []);

  React.useEffect(() => {
    if (typeof _activeIndex === 'number') {
      setActiveIndex(_activeIndex);
    }
  }, [_activeIndex]);

  const handleOnClick = (event: React.MouseEvent, index: number) => {
    setActiveIndex(index);
    onTabClick && onTabClick(event, tabs[index], index);
    onTabChange && onTabChange(tabs[index]);
  };

  const goToNext = (currentElement: HTMLElement) => {
    const next = currentElement.nextSibling as HTMLElement;
    if (next) {
      if (!next.ariaDisabled) {
        next.focus();
      } else {
        goToNext(next);
      }
    } else {
      const first = currentElement.parentElement?.firstChild as HTMLElement;
      if (first) {
        if (!first.ariaDisabled) {
          first.focus();
        } else {
          goToNext(first);
        }
      }
    }
  };

  const goToPrevious = (currentElement: HTMLElement) => {
    const previous = currentElement.previousSibling as HTMLElement;
    if (previous) {
      if (!previous.ariaDisabled) {
        previous.focus();
      } else {
        goToPrevious(previous);
      }
    } else {
      const last = currentElement?.parentElement?.lastChild as HTMLElement;
      if (last) {
        if (!last.ariaDisabled) {
          last.focus();
        } else {
          goToPrevious(last);
        }
      }
    }
  };

  const handleKeyboard = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      goToNext(event.currentTarget as HTMLElement);
    }
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      goToPrevious(event.currentTarget as HTMLElement);
    }

    if (event.key === 'Home') {
      event.preventDefault();
      const first = event.currentTarget?.parentElement?.firstChild as HTMLElement;
      if (first) {
        if (!first.ariaDisabled) {
          first.focus();
        } else {
          goToNext(first);
        }
      }
    }

    if (event.key === 'End') {
      event.preventDefault();
      const last = event.currentTarget?.parentElement?.lastChild as HTMLElement;
      if (last) {
        if (!last.ariaDisabled) {
          last.focus();
        } else {
          goToPrevious(last);
        }
      }
    }
  };

  const wrapperClasses = useTabsWrapperClass({ tabAlign });
  const listClasses = useTabsListClass({ tabAlign, hideLine });
  const tabClasses = useTabsTabClass({ tabAlign, variant });
  const iconClasses = useTabsIconClass({ hideLabel });

  const renderTabLabel = (tab: TabItem) => {
    return (
      <span className={cx('sk-tabs-tab-content')}>
        {tab.icon && !hideIcon ? <span className={cx(iconClasses)}>{tab.icon}</span> : <></>}
        {tab.label && !hideLabel ? tab.label : <></>}
        {tab.alert ? (
          <Badge
            counter={typeof tab.alert === 'number' ? tab.alert : undefined}
            color={alertSettings?.color || 'error'}
            noBorder={alertSettings?.noBorder}
            max={alertSettings?.max}
            variant={alertSettings?.variant}
            position={alertSettings?.position}
            size={alertSettings?.size || (typeof tab.alert === 'number' ? 'md' : 'sm')}
            className={alertSettings?.className}
          />
        ) : (
          <></>
        )}
      </span>
    );
  };

  return (
    <div className={cx(className, wrapperClasses)}>
      <div role="tablist" aria-orientation="horizontal" className={cx(listClassName, listClasses)} ref={ref} {...rest}>
        {tabs.map((tab, index) => (
          <button
            id={`sk-tab-${index}-${tab.id}`}
            key={`sk-tab-${index}-${tab.id}`}
            role="tab"
            disabled={tab.disabled}
            aria-disabled={tab.disabled}
            ref={index === activeIndex ? initialFocus : undefined}
            type="button"
            tabIndex={activeIndex === index ? undefined : -1}
            aria-label={tab.label}
            aria-controls={`sk-tab-panel-${index}-${tab.id}`}
            className={cx(tabClassName, tabClasses, { disabled: tab.disabled }, { active: activeIndex === index })}
            aria-selected={index === activeIndex}
            onKeyDown={handleKeyboard}
            onClick={(event) => handleOnClick(event, index)}
          >
            {renderTabLabel(tab)}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          className={cx('sk-tabs-panel', panelClassName, { active: activeIndex === index })}
          aria-hidden={activeIndex !== index}
          aria-labelledby={`sk-tab-${index}-${tab.id}`}
          key={`sk-tab-panel-${index}-${tab.id}`}
          id={`sk-tab-panel-${index}-${tab.id}`}
          role="tabpanel"
        >
          {tab.children}
        </div>
      ))}
    </div>
  );
});

if (__DEV__) {
  Tabs.displayName = 'Tabs';
}

export default Tabs;
