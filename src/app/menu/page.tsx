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

export default function Menu() {
	const [active, setActive] = useState<'메뉴판' | '메뉴이미지'>('메뉴판');
	const { tab } = useHomeStore();
	const router = useRouter();
	const { isLogin } = useAuthStore.getState();
	const canvasRef = useRef<HTMLDivElement>(null);
	const searchParams = useSearchParams();
	const menuId = Number(searchParams.get('menuId'));
	const [menuList, setMenuList] = useState<IGetMyCategoryMenuType[]>([]);
	const { handleShare } = useKakaoShare({ canvasRef });
	const { setIsOpen } = useBottomSheet();

	useEffect(() => {
		if (!menuId) {
			if (typeof window !== 'undefined') {
				const data = sessionStorage.getItem('guest_menu');
				if (data) {
					setMenuList(JSON.parse(data));
				}
			}
		}
	}, []);

	const { data: menu, isLoading } = useQuery<IGetMyCategoryMenuType[]>({
		queryKey: ['MENU_LIST'],
		queryFn: () => {
			if (tab === 'my') {
				return getMyMenu(menuId);
			} else {
				return getTeamMenus(menuId);
			}
		},
	});

	useEffect(() => {
		menu && setMenuList(menu);
	}, [menu]);

	const handleModifyOption = () => {
		setIsOpen(true);
	};

	const handleDownImage = async () => {
		if (!canvasRef.current) {
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

	return (
		<>
			{isLoading ? (
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
												handleLeftClick={() =>
													router.push(`/vote?menuId=${menuId}`)
												}
											>
												투표하기
											</ShareButton>
										)
									) : (
										<ShareButton
											handleLeftClick={() => handleShare}
											handleRightClick={handleDownImage}
										>
											공유하기
										</ShareButton>
									)}
								</div>
							)}
							<BottomSheet>
								<AddTaste_BS menuId={menuId} />
							</BottomSheet>
						</div>
					</>
				)
			)}
		</>
	);
}
