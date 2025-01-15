import React from 'react';
import ToastManager, { CloseAllFn, CloseFn, MessageOptionalOptions, NotifyFn, ToastManagerProps } from './ToastManager';
import { MessageProp, PositionsType } from './Message';
import { createRoot } from 'react-dom/client';

const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
const PORTAL_ID = 'react-toast';

export class Toaster {
  createNotification?: NotifyFn;
  removeAll?: CloseAllFn;
  closeToast?: CloseFn;

  constructor() {
    if (!isBrowser) {
      return;
    }

    let portalElement;
    const existingPortalElement = document.getElementById(PORTAL_ID);

    if (existingPortalElement) {
      portalElement = existingPortalElement;
    } else {
      const el = document.createElement('div');
      el.id = PORTAL_ID;
      el.className = 'Toaster';
      if (document.body != null) {
        document.body.appendChild(el);
      }
      portalElement = el;
    }

    const root = createRoot(portalElement);
    root.render(<ToastManager notify={this.bindNotify} />);
  }

  closeAll = () => {
    if (this.removeAll) {
      this.removeAll();
    }
  };

  bindNotify: ToastManagerProps['notify'] = (fn, removeAll, closeToast) => {
    this.createNotification = fn;
    this.removeAll = removeAll;
    this.closeToast = closeToast;
  };

  notify = (message: MessageProp, options: MessageOptionalOptions = {}) => {
    if (this.createNotification) {
      return this.createNotification(message, options);
    }
  };

  close = (id: string, position: PositionsType) => {
    if (this.closeToast) {
      this.closeToast(id, position);
    }
  };
}

export default Toaster;
