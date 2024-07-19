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
import { useQuery } from '@tanstack/react-query';
import { getTeamMenuList } from '@/api/getTeamMenuList';
import { useSearchParams } from 'next/navigation';

const menuList: IGetMyCategoryMenuType[] = [
	{
		category: '한식',
		menu: [
			{
				menuId: 1,
				menuName: '김치찌개',
				tags: ['따뜻한', '국물있는'],
				imageUrl: '',
			},
			{
				menuId: 1,
				menuName: '라면',
				tags: ['따뜻한', '국물있는'],
				imageUrl: '',
			},
		],
	},
];

export default function Menu() {
	const [active, setActive] = useState<'메뉴판' | '메뉴이미지'>('메뉴판');
	// isLogin은 나중에 store의 isLogin으로 변경
	const isLogin = true;
	const canvasRef = useRef<HTMLDivElement>(null);
	const searchParams = useSearchParams();
	const teamBoardId = searchParams.get('teamBoardId');

	// const { data: menuList } = useQuery<IGetTeamMenuType[]>({
	// 	queryKey: ['TEAM_MENU_LIST'],
	// 	queryFn: getTeamMenuList,
	// });

	const handleSave = () => {
		alert('필터 적용이 완료되었습니다!');
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
						<ShareButton onClick={handleDownImage}>옵션 수정하기</ShareButton>
					) : (
						<ShareButton onClick={handleDownImage}>공유하기</ShareButton>
					)}
				</div>
			)}
			<BottomSheet>
				<AddTaste_BS onClick={handleSave} />
			</BottomSheet>
		</div>
	);
}
