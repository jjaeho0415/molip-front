'use client';

import Button from '@/components/buttons/Button';
import styles from './voteComponents.module.css';
import TopNavBar from '@/components/TopNavBar';
import { useState } from 'react';
import Image from 'next/image';
import Icon_unchecked from '../../../../public/icons/checkBox/checkBox_unchecked.svg';
import Icon_checked from '../../../../public/icons/checkBox/checkBox_checked.svg';
import { getTeamMenus } from '@/api/getTeamMenus';
import { useSearchParams } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getTeamMenuItem } from '@/api/getTeamMenuItem';
import { postVote } from '@/api/postVote';
import useVoteStore from '../store/useVoteStore';
import Loading from '@/components/Loading';
import AlertModal from '@/components/modals/AlertModal';

interface IVotingProps {
	onNext: () => void;
}

export default function Voting({ onNext }: IVotingProps) {
	const searchParams = useSearchParams();
	const boardId = Number(searchParams.get('menuId'));
	const { voteArr, setVoteArr } = useVoteStore();
	const { data: teamMenuItem } = useQuery<IGetTeamMenuType | null>({
		queryKey: ['TEAM_MENU_ITEM', boardId],
		queryFn: async () => getTeamMenuItem(boardId),
	});
	const [isVoteLoading, setIsVoteLoading] = useState<boolean>(false);
	const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);

	const { data: menuList, isLoading } = useQuery<IGetMyCategoryMenuType[]>({
		queryKey: ['MENU_LIST'],
		queryFn: () => getTeamMenus(boardId),
	});

	const { mutate: vote } = useMutation({
		mutationFn: (postVoteArr: number[]) => postVote(boardId, postVoteArr),
		onSuccess: () => {
			alert('투표 완료');
			onNext;
		},
		onSettled: () => setIsVoteLoading(false),
	});

	const handleSelectItem = (item: { menuName: string; menuId: number }) => {
		const isMenuExist = voteArr.some((menu) => menu.menuId === item.menuId);

		if (!isMenuExist) {
			if (voteArr.length >= 3) {
				setIsAlertModalOpen(true);
				return;
			}
			setVoteArr([
				...voteArr,
				{ menuName: item.menuName, menuId: item.menuId },
			]);
		} else {
			setVoteArr(voteArr.filter((menu) => menu.menuId !== item.menuId));
		}
	};

	const handleSubmitVote = () => {
		setIsVoteLoading(true);
		const postVoteArr = voteArr.map((item) => item.menuId);
		vote(postVoteArr);
	};
	return (
		<>
			{isLoading ? (
				<div className={styles.LoadingBox}>
					<Loading backgroundColor='white' />
				</div>
			) : (
				<>
					<TopNavBar title={teamMenuItem?.teamBoardName} />
					<div className={styles.VotingContentSection}>
						<div className={styles.VotingPBox}>
							<p className={styles.VotingP}>메뉴를 선택해주세요.</p>
							<p className={styles.VotingSub}>(최대 3개)</p>
							<p className={styles.VotingSubRight}>익명 투표</p>
						</div>
						<div className={styles.VotingListBox}>
							<div className={styles.VotingMenuList}>
								{menuList?.map((menu, index) => {
									return (
										<div key={index}>
											<p className={styles.VotingCategory}>{menu.category}</p>
											<div className={styles.VotingCategoryBox} key={index}>
												{menu.menu.map((item, idx) => (
													<div key={idx} className={styles.VotingMenuItemBox}>
														<Image
															className={styles.VotingCheckBox}
															src={
																voteArr.some(
																	(menu) => menu.menuId === item.menuId,
																)
																	? Icon_checked
																	: Icon_unchecked
															}
															width={24}
															height={24}
															alt='checkBox'
															onClick={() => handleSelectItem(item)}
														/>
														<p className={styles.VotingMenuItem}>
															{item.menuName}
														</p>
													</div>
												))}
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
					<div className={styles.ButtonBox}>
						<Button
							state={voteArr.length === 0 ? 'disabled' : 'default'}
							size='big'
							onClick={handleSubmitVote}
						>
							{isVoteLoading ? (
								<Loading backgroundColor='orange' />
							) : (
								'투표하기'
							)}
						</Button>
					</div>
				</>
			)}
			{isAlertModalOpen && (
				<AlertModal setIsAlertModalOpen={setIsAlertModalOpen} max={3} />
			)}
		</>
	);
}
