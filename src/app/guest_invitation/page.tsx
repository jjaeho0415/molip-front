'use client';

import Header from '@/components/Header';
import styles from './invitation.module.css';
import ModalButton from '@/components/buttons/ModalButton';
import LoginImage from '../../../public/svg/kakao_login_large_wide.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../login/store/useAuthStore';

export default function Guest_Invitation() {
	const router = useRouter();
	const { isLogin } = useAuthStore.getState();

	return (
		<>
			<Header />
			<div className={styles.ContentsContainer}>
				<div className={styles.modal}>
					<div
						className={`${styles.contentSection} ${!isLogin && styles.textDisabled}`}
					>
						<p className={styles.mainTitle}>'스위프 10팀'</p>
						<p className={styles.subTitle}>초대를 수락하시겠습니까?</p>
					</div>
					<div className={styles.buttonSection}>
						<ModalButton
							buttonText='아니요'
							handleClick={() => {
								return;
							}}
							color={isLogin ? 'gray' : 'disabled'}
							cursor={isLogin ? true : false}
						/>
						<ModalButton
							buttonText='예'
							handleClick={() => {
								return;
							}}
							color={isLogin ? 'orange' : 'disabled'}
							cursor={isLogin ? true : false}
						/>
					</div>
					{!isLogin && (
						<>
							<p className={styles.loginText}>먼저 로그인 해주세요.</p>
							<Image
								className={styles.kakaoBtn}
								src={LoginImage}
								width={350}
								height={60}
								alt='login'
								onClick={() => router.push('/login')}
							/>
						</>
					)}
				</div>
			</div>
		</>
	);
}
