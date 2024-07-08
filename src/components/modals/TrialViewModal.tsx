import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './styles/trialViewModal.module.css';
import ModalButton from '../buttons/ModalButton';

interface TrialViewModalProps {
  setIsTrialModalOpen: Dispatch<SetStateAction<boolean>>;
}

function TrialViewModal({ setIsTrialModalOpen }: TrialViewModalProps) {
  const [isImageSaveBtnShow, setIsImageSaveBtnShow] = useState<boolean>(true);
  const closeModal = (): void => {
    setIsTrialModalOpen(false);
  };

  const handleImageSave = (): void => {
    setIsImageSaveBtnShow(false);
  };

  return (
    <>
      <div
        className={styles.overlay}
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          if (event.target === event.currentTarget) {
            setIsTrialModalOpen(false);
          }
        }}
      >
        <div className={styles.modal}>
          <div className={styles.topText}>
            <p>
              {' '}
              <span className={styles.orange}>우리 팀 전용 메뉴판</span>도
              만들어봐요!
            </p>{' '}
            <p>동료들과 메뉴 도장깨기 어떤가요?😆</p>
          </div>
          <div className={styles.loginSection}>
            <button className={styles.loginButton}>로그인</button>
            <p className={styles.loginDescription}>
              팀 메뉴판은 로그인 후 이용 가능해요.
            </p>
          </div>
          <div className={styles.modalButtonSection}>
            <ModalButton
              buttonText='닫기'
              handleClick={closeModal}
              color='gray'
            />
            {isImageSaveBtnShow && (
              <ModalButton
                buttonText='이미지 저장'
                handleClick={handleImageSave}
                color='orange'
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TrialViewModal;
