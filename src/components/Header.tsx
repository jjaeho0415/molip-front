'use client';

import styles from './header.module.css';
import Image from 'next/image';
import Logo from '../../public/logo/Logo_noBg_orange.svg';
import Icon from '../../public/icons/Icon_mypage.svg';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import useHomeStore from '@/app/home/store/useHomeStore';

export default function Header() {
	const route = useRouter();
	const { isLogin } = useAuthStore.getState();
	const { setTab } = useHomeStore();
	const handleGoHome = () => {
		if (isLogin) {
			setTab('my');
			route.push('/');
		}
	};

	return (
		<div className={styles.HeaderContainer}>
			<Image
				className={styles.Icon}
				src={Logo}
				alt='logo'
				width={50}
				height={50}
				onClick={handleGoHome}
			/>
			<Image
				className={styles.Icon}
				src={Icon}
				alt='myPage'
				width={24}
				height={24}
				onClick={() => {
					route.push('/myPage');
				}}
			/>
		</div>
	);
}
