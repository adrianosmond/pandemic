import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import useOutsideClick from 'hooks/useOutsideClick';
import Button from 'components/Button';
import UiCard from 'components/UiCard';
import classes from './Modal.module.css';
import './Modal.css';

const Modal = ({ clickOutside, children }) => {
  const ref = useRef();
  useOutsideClick(ref, clickOutside);

  return ReactDOM.createPortal(
    <div className={classes.modal} ref={ref}>
      <UiCard className={classes.modalUiCard}>{children}</UiCard>
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
      <Button className={classes.cancelButton} onClick={closeModal}>
        {cancelText}
      </Button>
      <Button onClick={onConfirm}>{confirmText}</Button>
    </div>
  </Modal>
);
