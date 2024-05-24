import React from 'react';
import { SessionHistory } from '../../types';
import { cx } from '@sk-web-gui/utils';
import { Divider } from '@sk-web-gui/divider';
import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';

interface AIModuleSessionHistory extends React.ComponentPropsWithoutRef<'div'> {
  sessions: SessionHistory;
  title: string;
  onSelectSession?: (sessionId: string) => void;
}

export const AIModuleSessionHistory = React.forwardRef<HTMLDivElement, AIModuleSessionHistory>((props, ref) => {
  const { sessions, title, className, onSelectSession, ...rest } = props;
  const autoId = React.useId();
  const id = `sk-ai-module-sessions-history-title-${autoId}`;

  return (
    <div ref={ref} className={cx('sk-ai-module-sessions-history', className)} {...rest}>
      <Divider.Section size="sm" id={id}>
        {title}
      </Divider.Section>
      <ul role="menu" aria-labelledby={id} className="sk-ai-module-sessions-history-list">
        {sessions.map((session) => (
          <li key={session.id} className="sk-ai-module-sessions-history-list-entry" role="none">
            <Button
              size="sm"
              variant="tertiary"
              role="menuitem"
              onClick={() => onSelectSession && onSelectSession(session.id)}
              leftIcon={<Icon name="message-circle" />}
            >
              {session.title}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default AIModuleSessionHistory;
