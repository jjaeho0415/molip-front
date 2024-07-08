import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles/noticeModal.module.css';
import ModalButton from '../buttons/ModalButton';

interface NoticeModalProps {
  setIsNoticeModalOpen: Dispatch<SetStateAction<boolean>>;
  titleText: string;
}

function NoticeModal({ setIsNoticeModalOpen, titleText }: NoticeModalProps) {
  const closeModal = (): void => {
    setIsNoticeModalOpen(false);
  };

  const handleDelete = (): void => {
    setIsNoticeModalOpen(false);
  };

  return (
    <div
      className={styles.overlay}
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
          setIsNoticeModalOpen(false);
        }
      }}
    >
      <div className={styles.modal}>
        <div className={styles.contentSection}>
          {titleText && <p className={styles.mainTitle}>{`‘${titleText}’`}</p>}
          <p className={styles.subTitle}>메뉴판을 삭제하실 건가요?</p>
        </div>
        <div className={styles.buttonSection}>
          <ModalButton
            buttonText='아니요'
            handleClick={closeModal}
            color='gray'
          />
          <ModalButton
            buttonText='예'
            handleClick={handleDelete}
            color='orange'
          />
        </div>
      </div>
    </div>
  );
}

export default NoticeModal;
