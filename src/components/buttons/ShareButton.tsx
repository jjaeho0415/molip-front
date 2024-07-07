'use client';

import Button from '../../app/components/buttons/Button';
import Icon_download from '../../../../public/icons/buttons/download.svg';
import Icon_disabled from '../../../../public/icons/buttons/download_disabled.svg';
import styles from './share.module.css';
import Image from 'next/image';

interface IShareIprops {
  state?: 'default' | 'disabled';
  onClick?: () => void;
}

export default function ShareButton({
  state = 'default',
  onClick,
}: IShareIprops) {
  return (
    <div className={styles.Container}>
      <Button state={state} onClick={onClick}>
        공유하기
      </Button>
      <div
        className={`${styles[state]} ${styles.BtnBox}`}
        onClick={() => {
          return;
        }}
      >
        <Image
          src={state === 'default' ? Icon_download : Icon_disabled}
          width={24}
          height={24}
          alt='share'
        />
      </div>
    </div>
  );
}
