'use client';

import styles from './tabNav.module.css';
import { useRouter } from 'next/navigation';
import useHomeStore from '@/app/home/store/useHomeStore';

interface TabNavigationProps {
	// isUser는 props가 아닌 isLogin으로 바꿔야함
	isUser?: 'user' | 'guest';
}

export default function TabNavigation({ isUser = 'user' }: TabNavigationProps) {
	const { tab, setTab } = useHomeStore();
	const router = useRouter();

	const handleMyTab = () => {
		if (isUser === 'guest') {
			if (confirm('로그인이 필요한 서비스입니다. 로그인하시겠습니까?')) {
				router.push('/login');
			}
		} else {
			setTab('my');
			router.push('/home');
		}
	};

	const handleTeamTab = () => {
		if (isUser === 'guest') {
			if (confirm('로그인이 필요한 서비스입니다. 로그인하시겠습니까?')) {
				router.push('/login');
			}
		} else {
			setTab('team');
			router.push('/home');
		}
	};

	const handleMapTab = () => {
		if (isUser === 'guest') {
			if (confirm('로그인이 필요한 서비스입니다. 로그인하시겠습니까?')) {
				router.push('/login');
			}
		} else {
			setTab('map');
			router.push('/kakaoMap');
		}
	};

	return (
		<div className={styles.TabContainer}>
			<p
				className={tab === 'my' ? styles.active : styles.inactive}
				onClick={handleMyTab}
			>
				나의 메뉴판
			</p>
			<p
				className={tab === 'team' ? styles.active : styles.inactive}
				onClick={handleTeamTab}
			>
				팀 메뉴판
			</p>
			<p
				className={tab === 'map' ? styles.active : styles.inactive}
				onClick={handleMapTab}
			>
				지도 검색
			</p>
		</div>
	);
}
