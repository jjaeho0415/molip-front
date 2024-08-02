'use client';

import React, { useState } from 'react';
import styles from './myPage.module.css';
import Header from '@/components/Header';
import TopNavBar from '@/components/TopNavBar';
import NoticeModal from '@/components/modals/NoticeModal';
import Arrow_Icon from '../../../public/icons/buttons/rignt.svg';
import Image from 'next/image';
import VoteResultCard from '../vote/voteResult/components/voteResultCard';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getMyPageInfo } from '@/api/getMyPageInfo';
import Loading from '@/components/Loading';
import { getMyPageVotes } from '@/api/getMyPageVotes';

function MyPage() {
	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
	const router = useRouter();
	const pathName = usePathname();
	localStorage.setItem('Prev_Page', pathName)

	const { data: userInfo, isLoading } = useQuery<IUserInfo>({
		queryKey: ['USER_INFO'],
		queryFn: getMyPageInfo,
	});

	const { data: voteResults } = useQuery<IUserVotes[]>({
		queryKey: ['USER_VOTE'],
		queryFn: getMyPageVotes,
	});

	return (
		<>
			<Header />
			<TopNavBar title='마이페이지' backRoute='/home' />
			{isLoading ? (
				<div className={styles.loading}>
					<Loading backgroundColor='white' />
				</div>
			) : (
				<div className={styles.contentSection}>
					<div className={styles.title}>나의 기본 정보</div>
					<div className={styles.userInfoSection}>
						<div className={styles.userNameSection}>
							<p className={styles.leftText}>닉네임</p>
							<p className={styles.rightText}>{userInfo?.name}</p>
						</div>
						<div className={styles.userEmailSection}>
							<p className={styles.leftText}>카카오계정</p>
							<p className={styles.rightText}>{userInfo?.email}</p>
						</div>
					</div>
					<div className={styles.voteResultContainer}>
						<div className={styles.voteResultTopBox}>
							<p className={styles.voteResultP}>지난 투표 결과</p>
							<div
								className={styles.voteResultBtn}
								onClick={() => router.push('/vote/voteResult')}
							>
								더보기
								<Image
									className={styles.arrow}
									src={Arrow_Icon}
									width={18}
									height={18}
									alt='더보기'
								/>
							</div>
						</div>
						<div className={styles.voteListBox}>
							{voteResults?.slice(0, 3).map((item, idx) => (
								<div key={idx}>
									<VoteResultCard size='small' voteResult={item} />
								</div>
							))}
						</div>
					</div>
					<p
						className={styles.logoutSection}
						onClick={() => setIsLogoutModalOpen(true)}
					>
						로그아웃
					</p>
					{isLogoutModalOpen && (
						<NoticeModal
							setIsNoticeModalOpen={setIsLogoutModalOpen}
							titleText=''
							isLogout={true}
						/>
					)}
				</div>
			)}
		</>
	);
}

export default MyPage;
