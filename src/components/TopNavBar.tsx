'use client';

import Image from 'next/image';
import styles from './topNavBar.module.css';
import Icon_Back from '../../public/icons/Icon_back.svg';
import TopMenuButton from './buttons/TopMenuButton';
import MoreModal from './modals/MoreModal';
import { useState } from 'react';

interface ITopNavBarProps {
  menu?: boolean;
  title?: string;
}

export default function TopNavBar({ menu = false, title }: ITopNavBarProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <div className={styles.NavBarContainer}>
        <Image
          className={styles.Icon_Back}
          src={Icon_Back}
          width={24}
          height={24}
          alt='backIcon'
        />
        {menu && <TopMenuButton size='small' />}
        {title && <p className={styles.Title}>{title}</p>}
        {menu && (
          <Image
            className={styles.MoreBtn}
            alt='moreIcon'
            src='/svg/moreIcon.svg'
            width={24}
            height={24}
            onClick={() =>
              isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true)
            }
          />
        )}
      </div>
      {menu && isModalOpen && <MoreModal pageType='myMenu' />}
    </>
  );
}
