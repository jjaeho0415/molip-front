import styles from './menuBoard.module.css';
import Image from 'next/image';
import square from '../../../public/svg/square.svg';
import { useState } from 'react';

interface IMenuBoard {
	teamName: string;
	menuList: IMenuType[];
	type: '메뉴판' | '메뉴이미지';
}

const food_category = [
	{
		category: '한식',
		svg: '/icons/food_category/한식.svg',
		svgG: '/icons/food_category/한식_gray.svg',
	},
	{
		category: '중식',
		svg: '/icons/food_category/중식.svg',
		svgG: '/icons/food_category/중식_gray.svg',
	},
	{
		category: '일식',
		svg: '/icons/food_category/일식.svg',
		svgG: '/icons/food_category/일식_gray.svg',
	},
	{
		category: '양식',
		svg: '/icons/food_category/양식.svg',
		svgG: '/icons/food_category/양식_gray.svg',
	},
	{
		category: '인도/베트남/태국',
		svg: '/icons/food_category/인태베.svg',
		svgG: '/icons/food_category/인태베_gray.svg',
	},
	{
		category: '멕시코',
		svg: '/icons/food_category/멕시코.svg',
		svgG: '/icons/food_category/멕시코_gray.svg',
	},
	{
		category: '육류/해산물',
		svg: '/icons/food_category/육해.svg',
		svgG: '/icons/food_category/육해_gray.svg',
	},
];

export default function MenuBoard({ teamName, menuList, type }: IMenuBoard) {
	const [selectedImgCategory, setSelectedImgCategory] =
		useState<string>('한식');

	const getImgSrcG = (category: string) => {
		if (type === '메뉴이미지' && category !== selectedImgCategory) {
			return (
				food_category.find((food) => food.category === category)?.svgG ?? ''
			);
		} else return getImgSrc(category);
	};

	const getImgSrc = (category: string) => {
		return food_category.find((food) => food.category === category)?.svg ?? '';
	};

	const getCategories = () => {
		return menuList.map((menu) => menu.category);
	};

	return (
		<div className={styles.Container}>
			<p className={styles.MenuTitle}>{teamName}의 메뉴판</p>
			<div className={styles.MenuListBox}>
				{type === '메뉴판' &&
					menuList.map((menu, idx) => (
						<div className={styles.MenuBox} key={idx}>
							<div className={styles.Top}>
								<p className={styles.MenuP}>{menu.category}</p>
								<Image
									src={getImgSrc(menu.category)}
									width={24}
									height={24}
									alt='category_img'
								/>
							</div>
							<div className={styles.Bottom}>
								{menu.menu.map((menuItem: string, index: number) => (
									<p className={styles.MenuItemP} key={index}>
										{menuItem}
									</p>
								))}
							</div>
						</div>
					))}
			</div>
			{type === '메뉴이미지' && (
				<div className={styles.MenuImageContainer}>
					<div className={styles.SideCategoryBox}>
						{getCategories().map((category, idx) => (
							<div key={idx} className={styles.SideCategory}>
								<Image
									className={styles.image}
									src={getImgSrcG(category)}
									width={24}
									height={24}
									alt='category_img'
									onClick={() => setSelectedImgCategory(category)}
								/>
								<p className={styles.ImageP}>{category}</p>
							</div>
						))}
					</div>
					{menuList.map((menu, idx) => (
						<div className={styles.MenuImageBox} key={idx}>
							<div className={styles.ImageTop}>
								<p className={styles.MenuP}>{menu.category}</p>
								<Image
									src={getImgSrc(menu.category)}
									width={24}
									height={24}
									alt='category_img'
								/>
							</div>
							<div className={styles.ImageBottom}>
								{menu.menu.map((menuItem: string, index: number) => (
									<div className={styles.ImageBox}>
										<Image src={square} width={90} height={90} alt='square' />
										<p className={styles.MenuItemP} key={index}>
											{menuItem}
										</p>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
