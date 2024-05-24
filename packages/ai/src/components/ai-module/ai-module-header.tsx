import { cx } from '@sk-web-gui/utils';
import { Avatar } from '@sk-web-gui/avatar';
import React from 'react';
import { Button } from '@sk-web-gui/button';
import { Icon } from '@sk-web-gui/icon';
import { AIModuleDefaultProps } from './ai-module';

export interface AIModuleHeaderProps extends AIModuleDefaultProps, React.ComponentPropsWithoutRef<'div'> {}

export const AIModuleHeader = React.forwardRef<HTMLDivElement, AIModuleHeaderProps>((props, ref) => {
  const {
    docked,
    color,
    assistant,
    fullscreen,
    question,
    className,
    onOpen,
    onClose,
    onFullScreen,
    onCloseFullScreen,
    onNewSession,
    ...rest
  } = props;

  const handleToggleOpen = () => {
    if (docked) {
      onOpen && onOpen();
    } else {
      onClose && onClose();
    }
  };
  const handleToggleFullscreen = () => {
    if (fullscreen) {
      onCloseFullScreen && onCloseFullScreen();
    } else {
      onFullScreen && onFullScreen();
    }
  };
  return (
    <div
      ref={ref}
      className={cx('sk-ai-module-header', className)}
      data-color={color}
      data-docked={docked}
      data-fullscreen={fullscreen}
      {...rest}
    >
      {fullscreen ? (
        <>
          <Button
            size="sm"
            color="vattjom"
            rightIcon={<Icon name="plus" />}
            onClick={() => onNewSession && onNewSession()}
          >
            Ny fråga
          </Button>
          <div className="sk-ai-module-header-title">
            <Icon name="message-circle" />
            <span className="sk-ai-module-header-heading-name">{question ? question : 'Ny fråga'}</span>
          </div>
        </>
      ) : (
        <div className="sk-ai-module-header-title">
          <Avatar
            className="sk-ai-module-header-avatar"
            size={docked ? 'md' : 'sm'}
            imageElement={typeof assistant.avatar !== 'string' ? assistant.avatar : undefined}
            imageUrl={typeof assistant.avatar === 'string' ? assistant.avatar : undefined}
            imageAlt=""
            aria-hidden
          />
          <div className="sk-ai-module-header-heading">
            <span className="sk-ai-module-header-heading-name">{assistant.name}</span>
            {assistant.title && docked && (
              <span className="sk-ai-module-header-heading-subtitle">{assistant.title}</span>
            )}
          </div>
        </div>
      )}

      <div className="sk-ai-module-header-menu" role="menu">
        {!docked && (
          <Button
            variant="tertiary"
            size="sm"
            inverted={!fullscreen}
            iconButton
            onClick={() => handleToggleFullscreen()}
          >
            <Icon name={fullscreen ? 'arrow-down-right' : 'arrow-up-left'} />
          </Button>
        )}
        <Button variant="tertiary" size="sm" inverted={!fullscreen} iconButton onClick={() => handleToggleOpen()}>
          <Icon name={docked ? 'chevrons-up' : 'chevrons-down'} />
        </Button>
      </div>
    </div>
  );
});
