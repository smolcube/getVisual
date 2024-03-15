import React from 'react';

import ButtonCTA from '../Components/ButtonCTA';

const Feedback = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="feedback feedback--open">
      <div className="feedback__overlay"></div>
      <div className="feedback__content">
      <ButtonCTA 
        class="pri-cta cta feedback__close-btn" 
        name="Close" 
        function={onClose}
      />
        <div className="feedback__body">{children}</div>
      </div>
    </div>
  );
};

export default Feedback;