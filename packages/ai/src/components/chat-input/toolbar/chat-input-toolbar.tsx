import { cx, getValidChildren } from '@sk-web-gui/utils';
import React, { FragmentProps } from 'react';
import { ChatInputWrapperProps } from '../chat-input-wrapper';
import { useChatInputToolbarClasses } from '../styles';
import { ChatInputToolbarButton, ChatInputToolbarButtonProps } from './chat-input-toolbar-button';
import { ChatInputToolbarContext } from './chat-input-toolbar-context';

export interface ChatInputToolbarProps extends React.ComponentPropsWithRef<'div'> {
  size?: ChatInputWrapperProps['size'];
  disabled?: boolean;
}

export const ChatInputToolbar = React.forwardRef<HTMLDivElement, ChatInputToolbarProps>((props, ref) => {
  const [active, setActive] = React.useState<number>(0);
  const [delayedHover, _setDelayedHover] = React.useState<boolean>(false);
  const timeout = React.useRef<NodeJS.Timeout>(null);

  const { className, children, size = 'md', disabled, ...rest } = props;

  const classes = useChatInputToolbarClasses({ size });

  const toolbarButtons: React.JSX.Element[] = [];

  const getClones = (children: React.ReactNode): React.ReactNode => {
    const validChildren = getValidChildren(children);
    return validChildren.map((child, i) => {
      if (React.isValidElement<ChatInputToolbarButtonProps>(child) && child.type === ChatInputToolbarButton) {
        toolbarButtons.push(child);
        return React.cloneElement(child, {
          index: toolbarButtons.length - 1,
          key: `sk-btn-group-button-${i}`,
        });
      }

      if (React.isValidElement<FragmentProps>(child) && child.type === React.Fragment && child.props.children) {
        return getClones(child.props.children);
      }
      return React.cloneElement(child, {
        key: `sk-btn-group-button-${i}`,
      });
    });
  };
  const next = () => {
    const total = toolbarButtons.length;
    if (active === total - 1) {
      setActive(0);
    } else {
      setActive(active + 1);
    }
  };

  const prev = () => {
    const total = toolbarButtons.length;
    if (active === 0) {
      setActive(total - 1);
    } else {
      setActive(active - 1);
    }
  };

  const setDelayedHover = (hover: boolean) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }

    timeout.current = setTimeout(() => {
      _setDelayedHover(hover);
    }, 2000);
  };

  const context = {
    active,
    setActive,
    size,
    disabled,
    next,
    prev,
    delayedHover,
    setDelayedHover,
  };

  return (
    <ChatInputToolbarContext.Provider value={context}>
      <div role="menubar" ref={ref} className={cx(classes, className)} {...rest}>
        {getClones(children)}
      </div>
    </ChatInputToolbarContext.Provider>
  );
});
