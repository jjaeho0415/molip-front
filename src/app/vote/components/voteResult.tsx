'use client';

import Button from '@/components/buttons/Button';
import styles from './voteComponents.module.css';
import TopNavBar from '@/components/TopNavBar';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import Icon_check from '../../../../public/icons/checkOrange_small.svg';
import Image from 'next/image';

const menus = [
	{ name: '물냉면', value: 5 },
	{ name: '비빔밥', value: 4 },
	{ name: '짬뽕', value: 2 },
	{ name: '쫄면', value: 1 },
	{ name: '김치찜', value: 1 },
	{ name: '김치찜', value: 1 },
	{ name: '김치찜', value: 1 },
	{ name: '김치찜', value: 1 },
	{ name: '짬뽕', value: 2 },
];

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
				<div className={styles.ResultVoteListBox}>
					{menus.map((item, idx) => (
						<div className={styles.ResultMenuItemBox}>
							<div className={styles.ResultMenuItemTextBox}>
								<p key={idx} className={styles.ResultMenuItem}>
									{item.name}
									{idx === 0 && (
										<Image
											src={Icon_check}
											width={24}
											height={24}
											alt='check'
										/>
									)}
								</p>
								<p className={styles.ResultMenuVoteValue}>{item.value}표</p>
							</div>
							<div className={styles.ResultProgressBox}>
								<ProgressBar
									members={5}
									voteValue={item.value}
									color={idx === 0 ? 'orange' : 'gray'}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className={styles.DoubleButtonBox}>
				<Button size='small'>다시 선택하기</Button>
				<Button size='small'>지난 결과 보기</Button>
			</div>
		</>
	);
}
