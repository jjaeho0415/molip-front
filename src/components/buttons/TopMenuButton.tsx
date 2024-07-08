'use client';

import React, { useState } from 'react';
import styles from './styles/topMenuButton.module.css';

export default function TopMenuButton() {
  const [active, setActive] = useState('board');

  return (
    <div className={styles.Container}>
      <button
        className={`${styles.Button} ${active === 'board' ? styles.active : styles.inactive}`}
        onClick={() => setActive('board')}
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
