'use client';

import styles from './tabNav.module.css';
import { useRouter } from 'next/navigation';
import useHomeStore from '@/app/home/store/useHomeStore';
import { RefObject, useState } from 'react';
import TrialViewModal from './modals/TrialViewModal';

interface TabNavigationProps {
	canvasRef?: RefObject<HTMLDivElement>;
}

export default function TabNavigation({ canvasRef }: TabNavigationProps) {
	const { tab, setTab } = useHomeStore();
	const isLogin = true;
	// const { isLogin } = useAuthStore.getState();
	const router = useRouter();
	const [isTrialViewModalOpen, setIsTrialViewModalOpen] =
		useState<boolean>(false);

	const handleMyTab = () => {
		if (!isLogin) {
			if (confirm('로그인이 필요한 서비스입니다. 로그인하시겠습니까?')) {
				router.push('/login');
			}
		} else {
			setTab('my');
			router.push('/home');
		}
	};

	const handleTeamTab = () => {
		if (!isLogin) {
			setIsTrialViewModalOpen(true);
		} else {
			setTab('team');
			router.push('/home');
		}
	};

	const handleMapTab = () => {
		if (!isLogin) {
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
			{isTrialViewModalOpen && (
				<TrialViewModal
					setIsTrialModalOpen={setIsTrialViewModalOpen}
					canvasRef={canvasRef}
				/>
			)}
		</div>
	);
}
