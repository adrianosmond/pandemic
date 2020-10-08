import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import useOutsideClick from 'hooks/useOutsideClick';
import Button from 'components/Button';
import UiCard from 'components/UiCard';
import './Modal.css';

const Modal = ({ clickOutside, children }) => {
  const ref = useRef();
  useOutsideClick(ref, clickOutside);

  return ReactDOM.createPortal(
    <div className="fixed z-10" ref={ref}>
      <UiCard className="m-0">{children}</UiCard>
    </div>,
    document.getElementById('modal-root'),
  );
};

export default Modal;

export const ConfirmModal = ({
  closeModal,
  children,
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
}) => (
  <Modal clickOutside={closeModal}>
    {children}
    <div className="flex mt-4 justify-end">
      <Button className="mr-4" onClick={closeModal}>
        {cancelText}
      </Button>
      <Button onClick={onConfirm}>{confirmText}</Button>
    </div>
  </Modal>
);
