import styles from './menuBoard.module.css';
import Image from 'next/image';
import { useRef, useState } from 'react';
import MenuCardModal from '../modals/MenuCardModal';
import { useSearchParams } from 'next/navigation';

interface IMenuBoard {
	menuList: IGetMyCategoryMenuType[];
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

export default function MenuBoard({ menuList, type }: IMenuBoard) {
	const [isMenuCardOpen, setIsMenuCardOpen] = useState<boolean>(false);
	const [selectedMenuItem, setSelectedMenuItem] = useState<string>('');
	const [selectedMenuImg, setSelectedMenuImg] = useState<string>('');
	const [selectedMenuTags, setSelectedMenuTags] = useState<string[]>([]);
	const [selectedImgCategory, setSelectedImgCategory] =
		useState<string>('한식');
	const categoryRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
	const searchParams = useSearchParams();
	const menuName = searchParams.get('menuName');

	const handleCategoryClick = (category: string) => {
		setSelectedImgCategory(category);
		categoryRef.current[category]?.scrollIntoView({ behavior: 'smooth' });
	};

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

	const handleMenuItemClick = (
		menuItem: string,
		menuImg: string,
		menuTags: string[],
	) => {
		setSelectedMenuItem(menuItem);
		setSelectedMenuImg(menuImg);
		setSelectedMenuTags(menuTags);
		setIsMenuCardOpen(true);
	};

	return (
		<div className={styles.Container}>
			<p className={styles.MenuTitle}>{menuName}</p>
			<div className={styles.MenuListBox}>
				{type === '메뉴판' &&
					menuList.map(
						(menu, idx) =>
							menu.menu.length !== 0 && (
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
										{menu.menu.map((menuItem, index) => (
											<p className={styles.MenuItemP} key={index}>
												{menuItem.menuName}
											</p>
										))}
									</div>
								</div>
							),
					)}
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
									onClick={() => handleCategoryClick(category)}
								/>
								<p className={styles.ImageP}>{category}</p>
							</div>
						))}
					</div>
					{menuList.map((menu, idx) => (
						<div
							className={styles.MenuImageBox}
							key={idx}
							ref={(el) => {
								categoryRef.current[menu.category] = el;
							}}
						>
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
								{menu.menu.map((menuItem, index) => (
									<div
										key={index}
										className={styles.ImageBox}
										onClick={() =>
											handleMenuItemClick(
												menuItem.menuName,
												menuItem.imageUrl,
												menuItem.tags,
											)
										}
									>
										<img
											src={menuItem.imageUrl}
											width={90}
											height={90}
											alt='menuItem'
										/>
										<p className={styles.MenuItemP}>{menuItem.menuName}</p>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			)}
			{isMenuCardOpen && selectedMenuItem && (
				<MenuCardModal
					menuTitle={selectedMenuItem}
					menuImage={selectedMenuImg}
					hashTags={selectedMenuTags}
					setIsMenuCardModalOpen={setIsMenuCardOpen}
				/>
			)}
		</div>
	);
}
