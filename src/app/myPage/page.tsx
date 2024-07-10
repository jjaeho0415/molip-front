'use client';

import React from 'react';
import styles from './myPage.module.css';
import Header from '@/components/Header';
import TopNavBar from '@/components/TopNavBar';
import { useRouter } from 'next/navigation';

function myPage() {
	const route = useRouter();
	return (
		<>
			<Header />
			<TopNavBar title='마이페이지' backRoute='/home' />
			<div className={styles.contentSection}>
				<div className={styles.title}>나의 기본 정보</div>
				<div className={styles.userInfoSection}>
					<div className={styles.userNameSection}>
						<p className={styles.leftText}>닉네임</p>
						<p className={styles.rightText}>스위프</p>
					</div>
					<div className={styles.userEmailSection}>
						<p className={styles.leftText}>카카오계정</p>
						<p className={styles.rightText}>molip@gmail.com</p>
					</div>
				</div>
				<p className={styles.logoutSection} onClick={() => route.push('/')}>
					로그아웃
				</p>
			</div>
		</>
	);
}

export default myPage;
