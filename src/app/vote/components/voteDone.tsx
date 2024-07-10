'use client';

import styles from './voteComponents.module.css';
import Button from '@/components/buttons/Button';
import TopNavBar from '@/components/TopNavBar';

interface IVoteDoneProps {
	onNext: () => void;
}

export default function VoteDone({ onNext }: IVoteDoneProps) {
	return (
		<>
			<TopNavBar />
			<div className={styles.DoneContentsContainer}></div>
			<div className={styles.ButtonBox}>
				<Button size='small' onClick={onNext}>
					다시 선택하기
				</Button>
				<Button size='small' onClick={onNext}>
					결과 보기
				</Button>
			</div>
		</>
	);
}
