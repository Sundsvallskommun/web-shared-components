import React, { PropsWithChildren } from 'react';
import { useTransition, animated, easings } from 'react-spring';
import Alert from './Alert';
import { useTimeout } from './useTimeout';
import POSITIONS from './Positions';

interface MessageCallback {
  id: string;
  onClose: () => void;
}

export type MessageType = 'default' | 'success' | 'error';
export type MessageRole = 'status' | 'alert';
export type PositionsType = keyof typeof POSITIONS;

const getStyle = (position: PositionsType) => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  } as React.CSSProperties;

  if (position.includes('right')) {
    style.alignItems = 'flex-end';
  } else if (position.includes('left')) {
    style.alignItems = 'flex-start';
  }

  return style;
};

export type MessageProp = React.ReactNode | ((callback: MessageCallback) => React.ReactNode) | string;

export interface MessageOptions {
  id: string;
  duration: number | null;
  type: MessageType;
  /**
   * The message role will change screen reader behavior.
   * Status is polite, with no "warning" message.
   * Alert should be read immediately and often with some type of "warning" message.
   * @default status
   */
  messageRole?: MessageRole;
  onRequestRemove: () => void;
  onRequestClose: () => void;
  showing: boolean;
  position: PositionsType;
}

interface Props extends MessageOptions {
  message: MessageProp;
  zIndex?: number;
  requestClose?: boolean;
  position: PositionsType;
}

export const Message = ({
  id,
  message,
  position,
  onRequestRemove,
  requestClose = false,
  duration = 30000,
  messageRole = 'status',
}: Props) => {
  const container = React.useRef<HTMLDivElement | null>(null);
  const [timer, setTimer] = React.useState(duration);
  const [localShow, setLocalShow] = React.useState(true);
  const [entered, setEntered] = React.useState(false);

  useTimeout(close, timer);

  const animation = {
    config: { duration: 200, easings: easings.easeInBack },
    from: {
      opacity: 0.5,
      marginTop: '4px',
    },
    enter: {
      opacity: 1,
      marginTop: '24px',
    },
    leave: {
      opacity: 0,
      marginTop: '14px',
    },
    onRest,
  };

  React.useEffect(() => {
    /**
     * Polite aria-live (and role status) will only read added texts, and not initial texts.
     * This delay makes shure the text is added after the wrapper.
     */
    if (!entered) {
      setTimeout(() => {
        setEntered(true);
      }, 200);
    }
  }, [entered]);

  const transition = useTransition(localShow, animation);
  const style = React.useMemo(() => getStyle(position), [position]);

  function onMouseEnter() {
    setTimer(null);
  }

  function onMouseLeave() {
    setTimer(duration);
  }

  function onRest() {
    if (!localShow) {
      onRequestRemove();
    }
  }

  function close() {
    setLocalShow(false);
  }

  React.useEffect(() => {
    if (requestClose) {
      setLocalShow(false);
    }
  }, [requestClose]);

  function RenderMessage() {
    if (typeof message === 'string' || React.isValidElement(message)) {
      return <Alert id={id} title={message} onClose={close} />;
    }

    if (typeof message === 'function') {
      return message({
        id,
        onClose: close,
      });
    }

    return null;
  }

  function MessageWithoutButton({ elements }: { elements?: React.ReactNode }): React.ReactNode | null {
    const allElements = elements ?? RenderMessage();

    return allElements
      ? React.Children.map(allElements, (child) => {
          if (React.isValidElement<React.ComponentPropsWithoutRef<'button'>>(child) && child.type === 'button') {
            return;
          }
          if (typeof child === 'string') {
            return child;
          }
          if (React.isValidElement<{ message: string }>(child)) {
            return child.props.message;
          }
          if (React.isValidElement<PropsWithChildren>(child) && child.props.children) {
            return MessageWithoutButton({ elements: child.props.children });
          }
        })
      : undefined;
  }

  const Component: React.FC<React.ComponentPropsWithRef<'div'>> = (props) => <div {...props} />;

  const AnimatedComponent = animated<typeof Component>(Component);

  return (
    <React.Fragment>
      {transition(
        (props, item) =>
          item && (
            <React.Fragment>
              <div className="sr-only" role={messageRole}>
                {(entered || messageRole === 'alert') && <MessageWithoutButton />}
              </div>
              <AnimatedComponent
                className="Toaster__message"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={{
                  opacity: props.opacity,
                  marginTop: props.marginTop,
                  ...style,
                }}
              >
                <AnimatedComponent
                  style={{
                    pointerEvents: 'auto',
                    maxWidth: '100vw',
                  }}
                  ref={container}
                  className="Toaster__message-wrapper"
                >
                  <div>
                    <RenderMessage />
                  </div>
                </AnimatedComponent>
              </AnimatedComponent>
            </React.Fragment>
          )
      )}
    </React.Fragment>
  );
};
