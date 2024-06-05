import { Button } from '@sk-web-gui/button';
import { Divider } from '@sk-web-gui/divider';
import { Icon } from '@sk-web-gui/icon';
import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { SessionHistory } from '../../types';

export interface AIModuleSessionHistoryProps extends React.ComponentPropsWithoutRef<'div'> {
  sessions: SessionHistory;
  title: string;
  /**
   * Id of the current (opened) session
   */
  current?: string;

  onSelectSession?: (sessionId: string) => void;
  onKeyNext?: (currentId: string) => void;
  onKeyPrev?: (currentId: string) => void;
}

export const AIModuleSessionHistory = React.forwardRef<HTMLDivElement, AIModuleSessionHistoryProps>((props, ref) => {
  const { sessions, title, className, onSelectSession, current, onKeyNext, onKeyPrev, ...rest } = props;
  const autoId = React.useId();
  const id = `sk-ai-module-sessions-history-title-${autoId}`;

  const focusable = current ? current : sessions[0].id;

  const handleKeyboardNavigation = (event: React.KeyboardEvent<HTMLButtonElement>, id: string) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        onKeyNext && onKeyNext(id);
        break;
      case 'ArrowUp':
        event.preventDefault();
        onKeyPrev && onKeyPrev(id);
        break;
    }
  };

  return (
    <div ref={ref} className={cx('sk-ai-module-sessions-history', className)} {...rest}>
      <Divider.Section size="sm" id={id}>
        {title}
      </Divider.Section>
      <ul
        role="menubar"
        aria-orientation="vertical"
        aria-labelledby={id}
        className="sk-ai-module-sessions-history-list"
      >
        {sessions.map((session) => (
          <li key={session.id} className="sk-ai-module-sessions-history-list-entry" role="none">
            <Button
              aria-current={current === session.id}
              tabIndex={focusable === session.id ? 0 : -1}
              size="sm"
              variant="tertiary"
              role="menuitem"
              id={`sk-ai-session-item-${session.id}`}
              onClick={() => onSelectSession && onSelectSession(session.id)}
              leftIcon={<Icon name="message-circle" />}
              onKeyDown={(e) => handleKeyboardNavigation(e, session.id)}
            >
              {session.name}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default AIModuleSessionHistory;
