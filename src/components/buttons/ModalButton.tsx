import React from 'react';
import styles from './modalButton.module.css';

interface ModalButtonProps {
  handleClick: () => void;
  buttonText: string;
  color: 'gray' | 'orange';
}

function ModalButton({ handleClick, buttonText, color }: ModalButtonProps) {
  return (
    <button
      onClick={handleClick}
      className={`${styles.closeButton} ${styles[color]}`}
    >
      {buttonText}
    </button>
  );
}

export default ModalButton;
