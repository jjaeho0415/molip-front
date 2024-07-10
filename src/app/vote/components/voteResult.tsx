'use client';

import Button from '@/components/buttons/Button';
import styles from './voteComponents.module.css';
import TopNavBar from '@/components/TopNavBar';

export default function VoteResult() {
	return (
		<>
			<TopNavBar />
			<div className={styles.ResultContentsContainer}></div>
			<div className={styles.ButtonBox}>
				<Button size='big'>투표하기</Button>
			</div>
		</>
	);
}
