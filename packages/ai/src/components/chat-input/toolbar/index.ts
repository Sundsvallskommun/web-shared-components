import {
  ChatInputToolbarProps as InternalChatInputToolbarProps,
  ChatInputToolbar as InternalChatInputToolbar,
} from './chat-input-toolbar';
import { ChatInputToolbarButton } from './chat-input-toolbar-button';

interface ChatInputToolbarProps extends React.ForwardRefExoticComponent<InternalChatInputToolbarProps> {
  Component: typeof InternalChatInputToolbar;
  Button: typeof ChatInputToolbarButton;
}

export const ChatInputToolbar = {
  ...InternalChatInputToolbar,
  Component: InternalChatInputToolbar,
  Button: ChatInputToolbarButton,
} as ChatInputToolbarProps;

export type { ChatInputToolbarProps };
