import React from 'react';
import { ChatInputWrapperProps } from '../chat-input-wrapper';

export interface UseChatInputToolbarProps {
  active?: number;
  setActive?: (index: number) => void;
  next?: () => void;
  prev?: () => void;
  size?: ChatInputWrapperProps['size'];
  disabled?: boolean;
  delayedHover?: boolean;
  setDelayedHover?: (hover: boolean) => void;
}

export const ChatInputToolbarContext = React.createContext<UseChatInputToolbarProps>({});

const useChatInputToolbarContext = () => React.useContext(ChatInputToolbarContext);

export const useChatInputToolbar = (): UseChatInputToolbarProps => {
  const context = useChatInputToolbarContext();

  return { ...context };
};
