import React from 'react';
import './Popup.css';

const Popup = ({ show, handleClose, content }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-button" onClick={handleClose}>X</button>
        <div className="popup-content">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Popup;
