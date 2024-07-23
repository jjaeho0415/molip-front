'use client';

import Header from '@/components/Header';
import styles from './voteResult.module.css';
import TabNavigation from '@/components/TabNavigation';
import TopNavBar from '@/components/TopNavBar';
import VoteResultCard from './components/voteResultCard';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyPageVotes } from '@/api/getMyPageVotes';
import Loading from '@/components/Loading';

export default function VoteResult() {
	const [active, setActive] = useState<'메뉴판' | '메뉴이미지'>('메뉴판');
	const { data: voteResults, isLoading } = useQuery<IUserVotes[]>({
		queryKey: ['USER_VOTE'],
		queryFn: getMyPageVotes,
	});

	return (
		<div className={styles.Container}>
			<Header />
			<TabNavigation />
			<TopNavBar
				title='지난 결과 보기'
				active={active}
				setActive={setActive}
				backRoute='/home'
			/>
			{isLoading ? (
				<div className={styles.loading}>
					<Loading backgroundColor='white' />
				</div>
			) : (
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
			)}
		</div>
	);
}
