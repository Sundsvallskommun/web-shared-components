import { ModalComponent, ModalComponentProps } from './modal';
import { ModalContent } from './modal-content';
import { ModalFooter } from './modal-footer';

interface ModalProps extends React.ForwardRefExoticComponent<ModalComponentProps> {
  Component: typeof ModalComponent;
  Content: typeof ModalContent;
  Footer: typeof ModalFooter;
}

const Modal = {
  ...ModalComponent,
  Component: ModalComponent,
  Content: ModalContent,
  Footer: ModalFooter,
} as ModalProps;

export { Modal };
export type { ModalProps };
export default Modal;
