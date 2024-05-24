import { cx } from '@sk-web-gui/utils';
import React from 'react';
import { AIModuleHeader } from './ai-module-header';
import { InputSection } from '../input-section';
import { AssistantInfo } from '../../types';

export interface AIModuleDefaultProps {
  docked?: boolean;
  color?: string;
  fullscreen?: boolean;
  question?: string;
  assistant: AssistantInfo;
  onOpen?: () => void;
  onClose?: () => void;
  onFullScreen?: () => void;
  onCloseFullScreen?: () => void;
  onNewSession?: () => void;
}

export interface AIModuleProps extends AIModuleDefaultProps, React.ComponentPropsWithoutRef<'div'> {}

export const AIModule = React.forwardRef<HTMLDivElement, AIModuleProps>((props, ref) => {
  const {
    docked: _docked,
    fullscreen: _fullscreen,
    color,
    question,
    assistant,
    onOpen,
    onClose,
    onFullScreen,
    onCloseFullScreen,
    onNewSession,
    className,
    ...rest
  } = props;

  const [docked, setDocked] = React.useState<boolean>(true);
  const [fullscreen, setFullscreen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (typeof _docked === 'boolean') {
      setDocked(_docked);
    }
  }, [_docked]);

  React.useEffect(() => {
    if (typeof _fullscreen === 'boolean') {
      setFullscreen(_fullscreen);
    }
  }, [_fullscreen]);

  const handleOnOpen = () => {
    setDocked(false);
    onOpen && onOpen();
  };

  const handleOnClose = () => {
    setDocked(true);
    setFullscreen(false);
    onCloseFullScreen && onCloseFullScreen();
    onClose && onClose();
  };

  const handleOnFullscreen = () => {
    if (docked) {
      handleOnOpen();
    }
    setFullscreen(true);
    onFullScreen && onFullScreen();
  };

  const handleOnCloseFullscreen = () => {
    setFullscreen(false);
    onCloseFullScreen && onCloseFullScreen();
  };

  return (
    <div ref={ref} className={cx('sk-ai-module', className)} {...rest} data-fullscreen={fullscreen}>
      <AIModuleHeader
        docked={docked}
        fullscreen={fullscreen}
        assistant={assistant}
        color={color}
        question={question}
        onOpen={handleOnOpen}
        onClose={handleOnClose}
        onFullScreen={handleOnFullscreen}
        onCloseFullScreen={handleOnCloseFullscreen}
        onNewSession={onNewSession}
      />
      {!docked && !fullscreen && (
        <>
          <div className="sk-ai-module-feed h-80"></div>
          <InputSection />
        </>
      )}
    </div>
  );
});
