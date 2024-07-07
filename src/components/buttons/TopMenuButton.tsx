'use client';

import React, { useState } from 'react';
import styles from './topMenuButton.module.css';

export default function TopMenuButton() {
  const [active, setActive] = useState('image');

  return (
    <div className={styles.Container}>
      <button
        className={`${styles.Button} ${active === 'menu' ? styles.active : styles.inactive}`}
        onClick={() => setActive('menu')}
      >
        메뉴판 보기
      </button>
      <button
        className={`${styles.Button} ${active === 'image' ? styles.active : styles.inactive}`}
        onClick={() => setActive('image')}
      >
        메뉴 이미지 보기
      </button>
    </div>
  );
}
