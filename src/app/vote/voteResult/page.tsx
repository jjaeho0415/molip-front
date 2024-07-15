'use client';

import Header from '@/components/Header';
import styles from './voteResult.module.css';
import TabNavigation from '@/components/TabNavigation';
import TopNavBar from '@/components/TopNavBar';
import VoteResultCard from './components/voteResultCard';
import { useState } from 'react';

const voteResults = [
	{
		team: '스위프 10팀',
		date: '2024.07.07(일)',
		menu: ['물냉면', '비빔냉면', '짬뽕', '쫄면', '짜장면'],
	},
	{
		team: '맛집 동아리',
		date: '2024.06.21(금)',
		menu: ['물냉면', '비빔밥', '짬뽕', '쫄면', '짜장면'],
	},
	{
		team: '스위프 10팀',
		date: '2024.07.07(일)',
		menu: ['마라전골', '아이스크림', '마라짬ㄱ뽕', '샤브샤브', '짜장면'],
	},
	{
		team: '맛집 동아리',
		date: '2024.06.21(금)',
		menu: ['물냉면', '비빔냉면', '짬뽕', '쫄면', '짜장면'],
	},
	{
		team: '스위프 10팀',
		date: '2024.07.07(일)',
		menu: ['물냉면', '비빔냉면', '짬뽕', '쫄면', '짜장면'],
	},
];

export default function VoteResult() {
	const [active, setActive] = useState<'메뉴판' | '메뉴이미지'>('메뉴판');

	return (
		<div className={styles.Container}>
			<Header />
			<TabNavigation />
			<TopNavBar title='지난 결과 보기' active={active} setActive={setActive} />
			<div className={styles.ContentContainer}>
				{voteResults ? (
					<>
						<div className={styles.CardListBox}>
							{voteResults.map((voteResult, idx) => (
								<div key={idx}>
									<VoteResultCard voteResult={voteResult} />
								</div>
							))}
						</div>
						<p className={styles.BottomComment}>
							30일이 지난 투표 결과는 자동으로 삭제됩니다.
						</p>
					</>
				) : (
					<p className={styles.NoVote}>최근 30일간 투표 내역이 없어요.</p>
				)}
			</div>
		</div>
	);
}
