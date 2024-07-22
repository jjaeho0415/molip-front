'use client';

import styles from './voteComponents.module.css';
import Button from '@/components/buttons/Button';
import TopNavBar from '@/components/TopNavBar';
import Image from 'next/image';
import Icon from '../../../../public/icons/checkOrange.svg';
import OptionButton from '@/components/buttons/OptionButton';
import useVoteStore from '../store/useVoteStore';

interface IVoteDoneProps {
	onNext: () => void;
	onBefore: () => void;
}

export default function VoteDone({ onNext, onBefore }: IVoteDoneProps) {
	const { voteArr } = useVoteStore();
	return (
		<>
			<TopNavBar />
			<div className={styles.DoneContentsContainer}>
				<div className={styles.DoneContent}>
					<Image src={Icon} width={48} height={48} alt='check' />
					<p className={styles.DoneP}>투표를 완료했습니다.</p>
					<div className={styles.DoneOptionBox}>
						{voteArr.map((item, idx) => (
							<div key={idx}>
								<OptionButton state='selected' option={false}>
									{item.menuName}
								</OptionButton>
							</div>
						))}
					</div>
				</div>
				<p className={styles.DoneVotingComment}>
					다른 팀원이 투표 중입니다. (3/4)
				</p>
			</div>
			<div className={styles.DoubleButtonBox}>
				<Button size='small' onClick={onBefore}>
					다시 선택하기
				</Button>
				<Button size='small' onClick={onNext}>
					결과 보기
				</Button>
			</div>
		</>
	);
}
