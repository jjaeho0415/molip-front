'use client';

import styles from './header.module.css';
import Image from 'next/image';
import Logo from '../../public/logo/Logo_noBg_orange.svg';
import Icon from '../../public/icons/Icon_mypage.svg';

export default function Header() {
  return (
    <div className={styles.HeaderContainer}>
      <Image
        className={styles.Icon}
        src={Logo}
        alt='logo'
        width={50}
        height={50}
      />
      <Image
        className={styles.Icon}
        src={Icon}
        alt='myPage'
        width={24}
        height={24}
        onClick={() => {
          return;
        }}
      />
    </div>
  );
}
