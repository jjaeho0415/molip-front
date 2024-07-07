import Image from 'next/image';
import React from 'react';
import styles from './menuCardModal.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';

interface MenuCardModalProps {
  menuTitle: string;
  hashTags: string[];
  menuImage: string;
}

export default function MenuCardModal({
  menuTitle,
  hashTags,
  menuImage,
}: MenuCardModalProps) {
  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <Image alt='menuImage' src={menuImage} height={240} width={240} />
          <h2 className={styles.title}>{menuTitle}</h2>
          <Swiper spaceBetween={10} slidesPerView={3} className={styles.swiper}>
            {hashTags.map((tag, index) => (
              <SwiperSlide key={index}>
                <div className={styles.hashtag}>{tag}</div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button className={styles.closeButton}>닫기</button>
        </div>
      </div>
    </>
  );
}
