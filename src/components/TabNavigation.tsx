'use client';

import styles from './tabNav.module.css';
import { useRouter } from 'next/navigation';
import useHomeStore from '@/app/home/store/useHomeStore';

export default function TabNavigation() {
	const { tab, setTab } = useHomeStore();
	const router = useRouter();

	return (
		<div className={styles.TabContainer}>
			<p
				className={tab === 'my' ? styles.active : styles.inactive}
				onClick={() => {
					setTab('my');
					router.push('/home');
				}}
			>
				나의 메뉴판
			</p>
			<p
				className={tab === 'team' ? styles.active : styles.inactive}
				onClick={() => {
					setTab('team');
					router.push('/home');
				}}
			>
				팀 메뉴판
			</p>
		</div>
	);
}
