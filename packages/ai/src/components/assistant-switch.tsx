import React from 'react';
import { AIFeedAvatar, AssistantInfo } from '../types';
import { cx } from '@sk-web-gui/utils';
import { Avatar } from '@sk-web-gui/avatar';
import { ArrowDownUp } from 'lucide-react';
import { AssistantAvatar } from './assistant-avatar';
import { Icon } from '@sk-web-gui/icon';

export interface AssistantSwitchProps extends React.ComponentPropsWithoutRef<'button'> {
  assistant: AssistantInfo;
  avatar?: AIFeedAvatar;
  /**
   * If the button is pressed (active) or not
   * @default false
   */
  pressed?: boolean;
  /**
   * Text to be displayed when pressed
   * @default "Byt assistent"
   */
  pressedText?: string;
  /**
   * Icon to be displayed when pressed
   * @default ArrowDownUp
   */
  pressedIcon?: JSX.Element;

  inverted?: boolean;
}

export const AssistantSwitch = React.forwardRef<HTMLButtonElement, AssistantSwitchProps>((props, ref) => {
  const {
    className,
    assistant,
    avatar,
    pressed,
    pressedText = 'Byt assistent',
    pressedIcon = <ArrowDownUp />,
    inverted,
    ...rest
  } = props;

  return (
    <button
      aria-pressed={pressed}
      className={cx('sk-ai-assistant-switch', className)}
      ref={ref}
      aria-label={pressed ? pressedText : `${assistant.name}. ${pressedText}`}
      data-inverted={inverted}
      {...rest}
    >
      <span className="sk-ai-assistant-switch-icon">
        {pressed ? (
          <Avatar
            color="primary"
            accent
            imageElement={pressedIcon}
            className="sk-ai-assistant-switch-icon-switch"
          ></Avatar>
        ) : (
          <AssistantAvatar assistant={assistant} avatar={avatar} size="sm" />
        )}
      </span>
      <span className="sk-ai-assistant-switch-text">{pressed ? pressedText : assistant.name}</span>
      {!pressed && (
        <span className="sk-ai-assistant-switch-hover-icon">
          <Icon icon={<ArrowDownUp />} />
        </span>
      )}
    </button>
  );
});
