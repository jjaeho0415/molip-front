'use client';

import Header from '@/components/Header';
import styles from './menu.module.css';
import TabNavigation from '@/components/TabNavigation';
import TopNavBar from '@/components/TopNavBar';
import { useEffect, useRef, useState } from 'react';
import MenuBoard from '@/components/MenuBoard/MenuBoard';
import ShareButton from '@/components/buttons/ShareButton';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import AddTaste_BS from '@/components/BottomSheet/AddTaste_BS';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getMyMenu } from '@/api/getMyMenu';
import Loading from '@/components/Loading';
import { getTeamMenus } from '@/api/getTeamMenus';
import useHomeStore from '../home/store/useHomeStore';
import useKakaoShare from '@/hooks/useKakaoShare';
import { useAuthStore } from '../login/store/useAuthStore';
import useBottomSheet from '@/hooks/useBottomSheet';
import { getVoteResult } from '@/api/getVoteResult';
import VoteAlertModal from '@/components/modals/VoteAlertModal';

export default function Menu() {
	const [active, setActive] = useState<'메뉴판' | '메뉴이미지'>('메뉴판');
	const { tab } = useHomeStore();
	const { isLogin } = useAuthStore.getState();
	const canvasRef = useRef<HTMLDivElement>(null);
	const searchParams = useSearchParams();
	const menuId = Number(searchParams.get('menuId'));
	const menuName = String(searchParams.get('menuName'));
	const [menuList, setMenuList] = useState<IGetMyCategoryMenuType[]>([]);
	const { handleShare } = useKakaoShare({ canvasRef });
	const { setIsOpen } = useBottomSheet();
	const router = useRouter();
	const [pageLoading, setPageLoading] = useState<boolean>(true);
	const [sessionLoading, setSessionLoading] = useState<boolean>(true);
	const [isVoteAlertModalOpen, setIsVoteAlertModalOpen] =
		useState<boolean>(false);

	useEffect(() => {
		setIsOpen(false);
	}, []);

	useEffect(() => {
		if (!menuId) {
			if (typeof window !== 'undefined') {
				const data = sessionStorage.getItem('guest_menu');
				if (data) {
					setMenuList(JSON.parse(data));
					setPageLoading(false);
				}
			}
		}
		// 이 부분 오류 나면 삭제
		else {
			!isLogin && router.push('/login');
		}
		setSessionLoading(false);
	}, []);

	const { data: vote } = useQuery<IGetVoteList>({
		queryKey: ['TEAM_BOARD_VOTES'],
		queryFn: () => getVoteResult(menuId),
	});

	const { data: menu } = useQuery<IGetMyCategoryMenuType[]>({
		queryKey: ['MENU_LIST'],
		enabled: isLogin && !sessionLoading,
		queryFn: () => {
			setPageLoading(true);
			if (tab === 'my') {
				setPageLoading(false);
				return getMyMenu(menuId);
			} else {
				setPageLoading(false);
				return getTeamMenus(menuId);
			}
		},
	});

	useEffect(() => {
		if (menu) {
			setMenuList(menu);
		}
	}, [menu]);

	const handleModifyOption = () => {
		setIsOpen(true);
	};

	const handleDownImage = async () => {
		if (!canvasRef.current) {
			return;
		}
		if (menuList?.length === 0) {
			alert('메뉴판에 저장된 메뉴가 없습니다.');
			return;
		}

		try {
			const div = canvasRef.current;
			const canvas = await html2canvas(div, { scale: 2 });
			canvas.toBlob((blob) => {
				if (blob !== null) {
					saveAs(blob, 'menuBoard.png');
				}
			});
		} catch (error) {
			alert('이미지 저장에 실패하였습니다.');
			console.error('Error converting div to image: ', error);
		}
	};

	const handleGoVote = () => {
		vote?.isVote === false || vote === undefined
			? setIsVoteAlertModalOpen(true)
			: router.push(`/vote?menuId=${menuId}&menuName=${menuName}`);
	};

	return (
		<>
			{pageLoading ? (
				<div className={styles.loading}>
					<Loading backgroundColor='white' />
				</div>
			) : (
				menuList && (
					<>
						<div className={styles.Container}>
							{isLogin ? (
								<Header />
							) : (
								<TopNavBar title='체험중' backRoute='/login' />
							)}
							<TabNavigation canvasRef={canvasRef} />
							<TopNavBar
								canvasRef={canvasRef}
								menu={true}
								active={active}
								setActive={setActive}
								pageType='insideMyMenu'
								backRoute='/home'
							/>
							<div ref={canvasRef} className={styles.ContentContainer}>
								<MenuBoard menuList={menuList} type={active} />
							</div>
							{active === '메뉴판' && (
								<div className={styles.ButtonBox}>
									{isLogin ? (
										tab === 'my' ? (
											<ShareButton
												handleRightClick={handleDownImage}
												handleLeftClick={handleModifyOption}
											>
												옵션 수정하기
											</ShareButton>
										) : (
											<ShareButton
												handleRightClick={handleDownImage}
												handleLeftClick={handleGoVote}
											>
												투표하러 가기
											</ShareButton>
										)
									) : (
										<ShareButton
											handleLeftClick={() => handleShare()}
											handleRightClick={handleDownImage}
										>
											공유하기
										</ShareButton>
									)}
								</div>
							)}
							{tab === 'team' &&
							(vote?.isVote === false || vote === undefined) ? (
								<>
									<BottomSheet>
										<AddTaste_BS menuId={menuId} />
									</BottomSheet>
								</>
							) : (
								tab === 'my' && (
									<>
										<BottomSheet>
											<AddTaste_BS menuId={menuId} />
										</BottomSheet>
									</>
								)
							)}
							{isVoteAlertModalOpen && (
								<VoteAlertModal
									setIsVoteAlertModalOpen={setIsVoteAlertModalOpen}
									menuId={menuId}
									menuName={menuName}
								/>
							)}
						</div>
					</>
				)
			)}
		</>
	);
}
