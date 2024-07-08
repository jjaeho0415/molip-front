import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import styles from './styles/inputModal.module.css';
import ModalButton from '../buttons/ModalButton';

interface InputModalProps {
  setIsInputModalOpen: Dispatch<SetStateAction<boolean>>;
}

function InputModal({ setIsInputModalOpen }: InputModalProps) {
  const [value, setValue] = useState<string>('');
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const closeModal = (): void => {
    setIsInputModalOpen(false);
  };

  const handleSave = (): void => {
    if (value === '') {
      setIsEmpty(true);
      return;
    }
    setIsEmpty(false);
    setIsInputModalOpen(false);
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
            {!isEmpty ? (
              <p className={styles.titleSection}>메뉴판의 이름을 입력하세요.</p>
            ) : (
              <p className={`${styles.titleSection} ${styles.empty}`}>
                메뉴판의 이름을 입력하세요.*
              </p>
            )}

            <input
              value={value}
              onChange={(e) => inputChange(e)}
              placeholder='ex) 스위프의 메뉴판'
              className={styles.inputSection}
            />
          </div>
          <div className={styles.bottomSection}>
            <ModalButton
              handleClick={closeModal}
              buttonText='취소'
              color='gray'
            />
            <ModalButton
              handleClick={handleSave}
              buttonText='확인'
              color='orange'
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default InputModal;
