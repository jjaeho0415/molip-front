'use client';

import Header from '@/components/Header';
import styles from './menu.module.css';
import TabNavigation from '@/components/TabNavigation';
import TopNavBar from '@/components/TopNavBar';
import { useRef, useState } from 'react';
import MenuBoard from '@/components/MenuBoard/MenuBoard';
import ShareButton from '@/components/buttons/ShareButton';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import AddTaste_BS from '@/components/BottomSheet/AddTaste_BS';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getMyMenu } from '@/api/getMyMenu';
import Loading from '@/components/Loading';

export default function Menu() {
	const [active, setActive] = useState<'메뉴판' | '메뉴이미지'>('메뉴판');
	// isLogin은 나중에 store의 isLogin으로 변경
	const isLogin = true;
	const canvasRef = useRef<HTMLDivElement>(null);
	const searchParams = useSearchParams();
	const menuId = Number(searchParams.get('menuId'));
	const menuName = searchParams.get('menuName');

	const {
		data: menuList,
		isLoading,
		refetch,
	} = useQuery<IGetMyCategoryMenuType[]>({
		queryKey: ['MENU_LIST'],
		queryFn: () => getMyMenu(menuId),
	});

	const handleShare = () => {
		return;
	};

	const handleModifyOption = () => {
		return;
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
							{isLogin ? <Header /> : <TopNavBar title='체험중' />}
							<TabNavigation isUser={isLogin ? 'user' : 'guest'} />
							<TopNavBar
								isLogin={isLogin}
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
									{/* isLogin가 true면 옵션수정하기, false면 공유하기, onClick함수도 다르게 줘야함 */}
									{isLogin ? (
										<ShareButton
											handleRightClick={handleDownImage}
											handleLeftClick={handleModifyOption}
										>
											옵션 수정하기
										</ShareButton>
									) : (
										<ShareButton
											handleLeftClick={handleShare}
											handleRightClick={handleDownImage}
										>
											공유하기
										</ShareButton>
									)}
								</div>
							)}
							<BottomSheet>
								<AddTaste_BS
									menuId={menuId}
									menuName={menuName}
									refetch={refetch}
								/>
							</BottomSheet>
						</div>
					</>
				)
			)}
		</>
	);
}
