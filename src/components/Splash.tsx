'use client';

import styles from './spalsh.module.css';
import Logo from '../../public/logo/Logo_noBg_white.svg';
import Image from 'next/image';

export default function Splash() {
  return (
    <div className={styles.Container}>
      <div className={styles.WhiteOverlay}></div>
      <div className={styles.Overlay}>
        <Image
          className={styles.Icon}
          src={Logo}
          width={88.05}
          height={46.46}
          alt='Logo'
        />
        <p className={styles.Comment}>모두의 입맛</p>
      </div>
    </div>
  );
}
