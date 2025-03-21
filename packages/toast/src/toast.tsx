import { Position, toaster } from '@sk-web-gui/toasted-notes';
import { DefaultProps } from '@sk-web-gui/utils';
import React from 'react';
import { MessageOptions } from '@sk-web-gui/toasted-notes';
interface IToast extends DefaultProps {
  /**
   * The title of the toast.
   */
  title?: string;
  /**
   * If `true` adds a close button to the toast.
   */
  closeable?: boolean;
  /**
   * Callback function to close the toast.
   */
  onClose?: () => void;
  /**
   * Callback function to undo the toast.
   */
  onUndo?: () => void;
  /**
   * The description of the toast
   */
  description?: string;
  /**
   * The undo text of the toast
   */
  undoText?: string;
  /**
   * Duration before dismiss in milliseconds, or `null` to never dismiss.
   */
  duration?: number | null;
  /**
   * One of toasted-notes positions.
   */
  position?: keyof typeof Position;
  /**
   * The message of the toast
   */
  message?: string;
  /**
   * The status of the toast
   */
  status?: 'info' | 'success' | 'error' | 'warning';
  /**
   * Custom icon
   */
  icon?: React.ElementType;
  /**
   * Custom close icon
   */
  closeIcon?: React.ElementType;
  messageRole?: MessageOptions['messageRole'];
}

interface RenderOption {
  render?: (props: { onClose: (id: string) => void; id: string }) => React.ReactNode;
}
export type useToastOptions = IToast & RenderOption;

export function createToast(Comp: React.ElementType) {
  return function () {
    const notify = React.useCallback(
      ({ position = 'bottom-left', duration = 5000, messageRole, render, ...rest }: useToastOptions) => {
        const options = {
          position,
          duration,
          messageRole,
        };

        if (render) {
          return toaster.notify(({ onClose, id }) => render({ onClose, id, ...rest }), options);
        }

        toaster.notify(
          ({ onClose, id }) => (
            <Comp
              {...{
                onClose,
                id,
                ...rest,
              }}
            />
          ),
          options
        );
      },
      []
    );

    return notify;
  };
}

export default createToast;
