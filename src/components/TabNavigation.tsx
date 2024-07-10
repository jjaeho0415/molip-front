'use client';

import { Dispatch, SetStateAction } from 'react';
import styles from './tabNav.module.css';
import { useRouter } from 'next/navigation';

interface ITabProps {
	tab: 'my' | 'team';
	setTab?: Dispatch<SetStateAction<'my' | 'team'>>;
}

export default function TabNavigation({ tab, setTab }: ITabProps) {
	const router = useRouter();

	return (
		<div className={styles.TabContainer}>
			<p
				className={tab === 'my' ? styles.active : styles.inactive}
				onClick={() => (setTab ? setTab('my') : router.push('/home'))}
			>
				나의 메뉴판
			</p>
			<p
				className={tab === 'team' ? styles.active : styles.inactive}
				onClick={() => (setTab ? setTab('team') : router.push('/home'))}
			>
				팀 메뉴판
			</p>
		</div>
	);
}
