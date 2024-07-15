'use client';

import Header from '@/components/Header';
import styles from './menu.module.css';
import TabNavigation from '@/components/TabNavigation';
import TopNavBar from '@/components/TopNavBar';
import { useState } from 'react';
import MenuBoard from '@/components/MenuBoard/MenuBoard';
import ShareButton from '@/components/buttons/ShareButton';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import AddTaste_BS from '@/components/BottomSheet/AddTaste_BS';

const menuList: IMenuType[] = [
	{
		category: '한식',
		menu: ['김치찌개', '김치찜', '물냉면', '닭갈비', '비빔밥'],
	},
	{
		category: '중식',
		menu: ['짜장면', '볶음밥', '깐풍기', '짬뽕', '팔보채', '마라탕', '탕수육'],
	},
	{
		category: '일식',
		menu: ['초밥', '우동', '오코노미야끼', '타코야끼', '라멘'],
	},
	{
		category: '양식',
		menu: ['불고기필라프', '토마토 스파게티', '까르보나라', '찹스테이크'],
	},
	{
		category: '인도/베트남/태국',
		menu: ['쌀국수', '월남쌈', '탄두리치킨', '팟타이', '반미'],
	},
	{
		category: '멕시코',
		menu: ['타코', '퀘사디아', '부리또'],
	},
	{
		category: '육류/해산물',
		menu: ['소고기', '돼지고기', '치킨', '대게', '회'],
	},
];

export default function Menu() {
	const [active, setActive] = useState<'메뉴판' | '메뉴이미지'>('메뉴판');

	const handleSave = () => {
		
		alert('필터 적용이 완료되었습니다!');
	};

	return (
		<>
			<Header />
			<TabNavigation />
			<TopNavBar
				menu={true}
				active={active}
				setActive={setActive}
				pageType='insideMyMenu'
				backRoute='/home'
			/>
			<div className={styles.ContentContainer}>
				<MenuBoard teamName={'스위프'} menuList={menuList} type={active} />
			</div>
			{active === '메뉴판' && (
				<div className={styles.ButtonBox}>
					<ShareButton>옵션 수정하기</ShareButton>
				</div>
			)}
			<BottomSheet>
				<AddTaste_BS onClick={handleSave} />
			</BottomSheet>
		</>
	);
}
