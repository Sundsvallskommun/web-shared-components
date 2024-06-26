import { addDays, format } from 'date-fns';
import AIModuleSessionHistory, { AIModuleSessionHistoryProps } from './ai-module-session-history';
import React, { useId } from 'react';
import { cx } from '@sk-web-gui/utils';

export interface AIModuleSessionsProps extends Omit<AIModuleSessionHistoryProps, 'title' | 'onKeyNext' | 'onKeyPrev'> {
  itemsBefore?: JSX.Element[];
  itemsAfter?: JSX.Element[];
  focus?: boolean;
}

export const AIModuleSessions = React.forwardRef<HTMLDivElement, AIModuleSessionsProps>((props, ref) => {
  const [itemsBefore, setItemsBefore] = React.useState<JSX.Element[] | undefined>(undefined);
  const [itemsAfter, setItemsAfter] = React.useState<JSX.Element[] | undefined>(undefined);
  const [ids, setIds] = React.useState<string[]>([]);
  const {
    sessions,
    className,
    onSelectSession,
    current,
    itemsBefore: _itemsBefore,
    itemsAfter: _itemsAfter,
    focus,
    ...rest
  } = props;
  const autoId = useId();
  const idPrefix = 'sk-ai-session-item-';

  const today = format(new Date(), 'yyyyMMdd');
  const yesterday = format(addDays(new Date(), -1), 'yyyyMMdd');

  const todaysSessions = sessions?.filter(
    (session) => session.name && format(session.updated_at, 'yyyyMMdd') === today
  );
  const yesterdaysSessions = sessions?.filter(
    (session) => session.name && format(session.updated_at, 'yyyyMMdd') === yesterday
  );
  const otherSessions = sessions?.filter((session) => {
    const date = format(session.updated_at, 'yyyyMMdd');
    return session.name && date !== yesterday && date !== today;
  });

  const onNext = (currentId: string) => {
    const currentIndex = ids.findIndex((id) => id === currentId);

    let nextId = ids[currentIndex + 1];
    if (!nextId) {
      nextId = ids[0];
    }

    if (nextId) {
      const nextElement = document.getElementById(nextId);
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  const onPrev = (currentId: string) => {
    const currentIndex = ids.findIndex((id) => id === currentId);
    let prevId = ids[currentIndex - 1];
    if (!prevId) {
      prevId = ids[ids.length - 1];
    }

    if (prevId) {
      const prevElement = document.getElementById(prevId);
      if (prevElement) {
        prevElement.focus();
      }
    }
  };

  const handleKeyboardNavigation = (event: React.KeyboardEvent<HTMLElement>, id: string) => {
    switch (event.key) {
      case 'ArrowDown':
        onNext(id);
        break;
      case 'ArrowUp':
        onPrev(id);
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    let newIds: string[] = [];
    if (_itemsBefore) {
      const newItems: JSX.Element[] = [];
      _itemsBefore.forEach((item, index) => {
        const newId = item.props.id || `${idPrefix}before-${autoId}-${index}`;
        newItems.push(
          React.cloneElement(item, {
            ...item.props,
            role: 'menuitem',
            id: newId,
          })
        );
        newIds.push(newId);
      });
      setItemsBefore(newItems);
    }

    if (sessions) {
      sessions.forEach((session) => {
        newIds.push(idPrefix + session.id);
      });
    }

    if (_itemsAfter) {
      const newItems: JSX.Element[] = [];
      _itemsAfter.forEach((item, index) => {
        const newId = item.props.id || `${idPrefix}after-${autoId}-${index}`;
        newItems.push(
          React.cloneElement(item, {
            ...item.props,
            role: 'menuitem',
            id: newId,
          })
        );
        newIds.push(newId);
      });
      setItemsAfter(newItems);
    }

    setIds(newIds);
  }, [sessions, _itemsBefore, _itemsAfter]);

  React.useEffect(() => {
    if (focus) {
      if (current) {
        const focusElement = document.getElementById(current) || document.getElementById(idPrefix + current);
        if (focusElement) {
          focusElement.focus();
        }
      } else {
        document.getElementById(ids[0])?.focus();
      }
    }
  }, [focus]);

  return (
    <div
      ref={ref}
      role="menubar"
      aria-label="Tidigare sessioner"
      aria-orientation="vertical"
      className={cx('sk-ai-module-sessions', className)}
      {...rest}
    >
      {itemsBefore && itemsBefore?.length > 0 ? (
        <div className="sk-ai-module-sessions-group" role="group">
          {itemsBefore.map((item, index) =>
            React.cloneElement(item, {
              ...item.props,
              key: item.props.id,
              'aria-current': item.props.id === current,
              tabIndex: current ? (item.props.id === current ? 0 : -1) : index === 0 ? 0 : -1,
              onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => handleKeyboardNavigation(event, item.props.id),
            })
          )}
        </div>
      ) : (
        <></>
      )}
      {todaysSessions.length > 0 && (
        <AIModuleSessionHistory
          sessions={todaysSessions}
          title="Idag"
          current={current || (itemsBefore && itemsBefore.length > 0 ? 'nothing' : '')}
          onSelectSession={onSelectSession}
          onKeyNext={onNext}
          onKeyPrev={onPrev}
        />
      )}
      {yesterdaysSessions.length > 0 && (
        <AIModuleSessionHistory
          sessions={yesterdaysSessions}
          title="Igår"
          current={current || (todaysSessions.length > 0 ? 'nothing' : '')}
          onSelectSession={onSelectSession}
          onKeyNext={onNext}
          onKeyPrev={onPrev}
        />
      )}
      {otherSessions.length > 0 && (
        <AIModuleSessionHistory
          sessions={otherSessions}
          title="Tidigare"
          current={
            current ||
            ((itemsBefore && itemsBefore.length > 0) || todaysSessions.length > 0 || yesterdaysSessions.length > 0
              ? 'nothing'
              : '')
          }
          onSelectSession={onSelectSession}
          onKeyNext={onNext}
          onKeyPrev={onPrev}
        />
      )}
      {itemsAfter && itemsAfter?.length > 0 ? (
        <div className="sk-ai-module-sidebar-sessions-group" role="group">
          {itemsAfter.map((item) =>
            React.cloneElement(item, {
              ...item.props,
              key: item.props.id,
              'aria-current': item.props.id === current,
              tabIndex: item.props.id === current ? 0 : -1,
              onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => handleKeyboardNavigation(event, item.props.id),
            })
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
});
