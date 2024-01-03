import React, { useState } from 'react';
import Modal from 'react-modal';

const Popup = ({ isOpen, onClose, children, customStyles }) => {
  
    const defaultStyles  = {
        content: {
          width: '50%', 
          height: '50%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
        closeButton: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '20px',
          },
      };
      const mergedStyles = { ...defaultStyles.content, ...customStyles };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Popup Dialog"
      style={{ content: mergedStyles }}
    >
      {children}
      <button style={defaultStyles.closeButton} onClick={onClose}>x</button>
    </Modal>
  );
};

export default Popup;