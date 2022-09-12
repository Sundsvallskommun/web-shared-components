import * as React from 'react';
import { useTransition, animated, easings } from 'react-spring';
import ReachAlert from '@reach/alert';
import Alert from './Alert';
import { useTimeout } from './useTimeout';
import POSITIONS from './Positions';

interface MessageCallback {
  id: string;
  onClose: () => void;
}

export type MessageType = 'default' | 'success' | 'error';

export type PositionsType = keyof typeof POSITIONS;

const getStyle = (position: PositionsType) => {
  let style = {
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

export const Message = ({ id, message, position, onRequestRemove, requestClose = false, duration = 30000 }: Props) => {
  const container = React.useRef<HTMLDivElement | null>(null);
  const [timeout, setTimeout] = React.useState(duration);
  const [localShow, setLocalShow] = React.useState(true);

  const isFromTop = position === 'top-left' || position === 'top-right' || position === 'top';

  useTimeout(close, timeout);

  const animation = {
    config: { duration: 200, easings: easings.easeInBack },
    from: {
      opacity: 0.5,
      marginTop: '-20px',
    },
    enter: {
      opacity: 1,
      marginTop: '0px',
    },
    leave: {
      opacity: 0,
      marginTop: '-10px',
    },
    onRest,
  } as any;

  const transition = useTransition(localShow, animation);
  const style = React.useMemo(() => getStyle(position), [position]);

  function onMouseEnter() {
    setTimeout(null);
  }

  function onMouseLeave() {
    setTimeout(duration);
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

  function renderMessage() {
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

  return (
    <React.Fragment>
      {transition(
        (props, item) =>
          item && (
            <animated.div
              className="Toaster__message"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              style={{
                opacity: props.opacity,
                height: props.height,
                marginTop: props.marginTop,
                ...style,
              }}
            >
              <animated.div
                style={{
                  transform: props.transform,
                  pointerEvents: 'auto',
                  maxWidth: '100vw',
                }}
                ref={container}
                className="Toaster__message-wrapper"
              >
                <ReachAlert>{renderMessage()}</ReachAlert>
              </animated.div>
            </animated.div>
          )
      )}
    </React.Fragment>
  );
};
