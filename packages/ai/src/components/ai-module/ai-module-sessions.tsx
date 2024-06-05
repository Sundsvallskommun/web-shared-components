import { addDays, format } from 'date-fns';
import AIModuleSessionHistory, { AIModuleSessionHistoryProps } from './ai-module-session-history';
import React from 'react';
import { cx } from '@sk-web-gui/utils';

export interface AIModuleSessionsProps extends Omit<AIModuleSessionHistoryProps, 'title' | 'onKeyNext' | 'onKeyPrev'> {}

export const AIModuleSessions = React.forwardRef<HTMLDivElement, AIModuleSessionsProps>((props, ref) => {
  const { sessions, className, onSelectSession, current, ...rest } = props;

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

  const idPrefix = 'sk-ai-session-item-';

  const onNext = (currentId: string) => {
    const currentIndex = sessions.findIndex((session) => session.id === currentId);
    let nextId = sessions[currentIndex + 1]?.id;
    if (!nextId) {
      nextId = sessions[0]?.id;
    }
    if (nextId) {
      const nextElement = document.getElementById(idPrefix + nextId);
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  const onPrev = (currentId: string) => {
    const currentIndex = sessions.findIndex((session) => session.id === currentId);
    let prevId = sessions[currentIndex - 1]?.id;
    if (!prevId) {
      prevId = sessions[sessions.length - 1]?.id;
    }
    if (prevId) {
      const prevElement = document.getElementById(idPrefix + prevId);
      if (prevElement) {
        prevElement.focus();
      }
    }
  };

  React.useEffect(() => {
    console.log(current);
  }, []);

  return (
    <div
      ref={ref}
      role="menubar"
      aria-label="Tidigare sessioner"
      aria-orientation="vertical"
      className={cx('sk-ai-module-sidebar-sessions', className)}
      {...rest}
    >
      {todaysSessions.length > 0 && (
        <AIModuleSessionHistory
          sessions={todaysSessions}
          title="Idag"
          current={current}
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
          current={current || (todaysSessions.length > 0 || yesterdaysSessions.length > 0 ? 'nothing' : '')}
          onSelectSession={onSelectSession}
          onKeyNext={onNext}
          onKeyPrev={onPrev}
        />
      )}
    </div>
  );
});
