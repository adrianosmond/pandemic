import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import useOutsideClick from 'hooks/useOutsideClick';
import UiCard from 'components/UiCard';
import classes from './Modal.module.css';
import './Modal.css';

const Modal = ({ clickOutside, children }) => {
  const ref = useRef();
  useOutsideClick(ref, clickOutside);

  return ReactDOM.createPortal(
    <div className={classes.modal} ref={ref}>
      <UiCard>{children}</UiCard>
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
    <div className={classes.buttonWrapper}>
      <button className={classes.cancelButton} onClick={closeModal}>
        {cancelText}
      </button>
      <button className={classes.confirmButton} onClick={onConfirm}>
        {confirmText}
      </button>
    </div>
  </Modal>
);
