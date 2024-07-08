import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import styles from './inputModal.module.css';

interface InputModalProps {
  setIsInputModalOpen: Dispatch<SetStateAction<boolean>>;
}

function InputModal({ setIsInputModalOpen }: InputModalProps) {
  const [value, setValue] = useState<string>('');
  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <>
      <div
        className={styles.overlay}
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          if (event.target === event.currentTarget) {
            setIsInputModalOpen(false);
          }
        }}
      >
        <div className={styles.modal}>
          <div className={styles.topSection}>
            <p className={styles.titleSection}>메뉴판의 이름을 입력하세요.</p>
            <input
              value={value}
              onChange={(e) => inputChange(e)}
              placeholder='ex) 스위프의 메뉴판'
              className={styles.inputSection}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default InputModal;
