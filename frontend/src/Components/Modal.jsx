import React, { useEffect } from 'react';

import ButtonIcon from './ButtonIcon';


const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    // Add class to body to prevent scrolling when modal is open
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal modal--open">
      <div className="modal__overlay"></div>
      <div className="modal__content">
      <ButtonIcon 
        class="pri-cta cta modal__close-btn" 
        name="Close" 
        onClick={onClose}
        ionicon="close-circle-outline"
      />
        <div className="modal__body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;