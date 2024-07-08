'use client';

import styles from './login.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import LoginImage from '../../../public/svg/kakao_login_large_wide.svg';
import Button from '@/components/buttons/Button';

export default function Login() {
  const loginHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/oauth2/authorization/kakao`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error,
      );
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.TutorialBox}>
        <Swiper
          pagination={true}
          modules={[Pagination]}
          className={styles.TutorialBox}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
      </div>
      <div className={styles.BtnBox}>
        <p className={styles.Sub}>
          오늘, 당신의 입맛을 반영한 '나의 메뉴판'을 만들어보세요!
        </p>
        <Button state='test'>'나의 메뉴판' 체험하기</Button>
        <Image
          className={styles.Kakao}
          src={LoginImage}
          width={350}
          height={60}
          alt='login'
          onClick={loginHandler}
        />
      </div>
    </div>
  );
}
