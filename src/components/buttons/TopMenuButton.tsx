'use client';

import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles/topMenuButton.module.css';

interface ITopMenuButtonProps {
	size?: 'small' | 'big';
	active: '메뉴판' | '메뉴이미지';
	setActive: Dispatch<SetStateAction<'메뉴판' | '메뉴이미지'>>;
}

export default function TopMenuButton({
	size = 'big',
	active,
	setActive,
}: ITopMenuButtonProps) {
	return (
		<div className={styles.Container}>
			<button
				className={`${styles.Button} ${styles[size]} ${active === '메뉴판' ? styles.active : styles.inactive}`}
				onClick={() => setActive('메뉴판')}
			>
				메뉴판 보기
			</button>
			<button
				className={`${styles.Button} ${styles[size]} ${active === '메뉴이미지' ? styles.active : styles.inactive}`}
				onClick={() => setActive('메뉴이미지')}
			>
				메뉴 이미지 보기
			</button>
		</div>
	);
}
