'use client';

import Button from '@/components/buttons/Button';
import styles from './voteComponents.module.css';
import TopNavBar from '@/components/TopNavBar';

export default function VoteResult() {
	return (
		<>
			<TopNavBar title='스위프의 메뉴판' />
			<div className={styles.ResultContentsContainer}>
				<div className={styles.ResultTextBox}>
					<p className={styles.VotingP}>투표 결과</p>
					<div className={styles.ResultDateBox}>
						<p className={styles.ResultDate}>2024.07.07</p>
						<p className={styles.ResultSubRight}>익명 투표</p>
					</div>
				</div>
			</div>
			<div className={styles.DoubleButtonBox}>
				<Button size='small'>다시 선택하기</Button>
				<Button size='small'>지난 결과 보기</Button>
			</div>
		</>
	);
}
