import { useState } from 'react';
import styles from './addMenu.module.css';
import Image from 'next/image';
import Icon_down from '../../../public/icons/down.svg';
import Icon_up from '../../../public/icons/up.svg';
import Button from '../buttons/Button';
import Icon_unchecked from '../../../public/icons/checkBox/checkBox_unchecked.svg';
import Icon_checked from '../../../public/icons/checkBox/checkBox_checked.svg';
import OptionButton from '../buttons/OptionButton';
import Loading from '../Loading';

const options = [
	'메뉴판1',
	'메뉴판 2',
	'나의 메뉴판',
	'수현이의 메뉴판',
	'내 메뉴판',
	'스위프의 메뉴판',
	'메뉴판입니다',
];

const menus = [
	{
		category: '한식',
		menus: ['김치찌개', '김치찜', '물냉면', '닭갈비', '비빔밥'],
	},
	{
		category: '중식',
		menus: ['짜장면', '볶음밥', '깐풍기', '짬뽕', '팔보채', '마라탕', '탕수육'],
	},
	{
		category: '일식',
		menus: ['초밥', '우동', '오코노미야끼', '타코야끼', '라멘'],
	},
];

export default function AddMenu_BS({ onClick }: { onClick: () => void }) {
	const [isShowSelectBox, setIsShowSelectBox] = useState<boolean>(false);
	const [selectedMyMenu, setSelectedMyMenu] = useState<string>('');
	const [tags, setTags] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSelectItem = (item: string) => {
		if (tags.includes(item)) {
			const newTagArr = tags.filter((menuItem) => menuItem !== item);
			setTags(newTagArr);
		} else {
			setTags([...tags, item]);
		}
	};

	const handleDeleteItem = (tag: string) => {
		if (tags.includes(tag)) {
			const newTagArr = tags.filter((menuItem) => menuItem !== tag);
			setTags(newTagArr);
		}
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.menuBoard}>
					{tags.length === 0 ? (
						<p className={styles.placeholder}>메뉴를 선택하세요.</p>
					) : (
						tags.map((tag, idx) => (
							<div className={styles.menuTag} key={idx}>
								<OptionButton
									state='selected'
									option={false}
									close={true}
									onClick={() => handleDeleteItem(tag)}
								>
									{tag}
								</OptionButton>
							</div>
						))
					)}
				</div>
				<p className={styles.sub}>나의 메뉴판 중 하나를 선택하세요.</p>
				<div
					className={styles.selectBar}
					onClick={() => setIsShowSelectBox(!isShowSelectBox)}
				>
					{selectedMyMenu === '' ? (
						<p className={styles.defaultMenu}>메뉴판을 선택하세요.</p>
					) : (
						<p className={styles.selectedMenu}>{selectedMyMenu}</p>
					)}
					<Image
						src={isShowSelectBox ? Icon_up : Icon_down}
						width={20}
						height={20}
						alt='Icon_down'
					/>
				</div>
				<ul className={isShowSelectBox ? styles.ul : styles.disabled}>
					{options.map((option, index) => (
						<li
							className={styles.li}
							key={index}
							value={option}
							onClick={() => {
								setSelectedMyMenu(option);
								setIsShowSelectBox(false);
							}}
						>
							{option}
						</li>
					))}
				</ul>
				{selectedMyMenu !== '' && (
					<p className={styles.menuSub}>
						메뉴를 선택해주세요.
						<span className={styles.subSpan}>최대 10개</span>
					</p>
				)}
				{selectedMyMenu !== '' && (
					<div className={styles.menuList}>
						{menus.map((menu, index) => {
							return (
								<>
									<p className={styles.category}>{menu.category}</p>
									<div className={styles.categoryBox} key={index}>
										{menu.menus.map((item, idx) => (
											<div key={idx} className={styles.menuItemBox}>
												<Image
													className={styles.checkBox}
													src={
														tags.includes(item) ? Icon_checked : Icon_unchecked
													}
													width={24}
													height={24}
													alt='checkBox'
													onClick={() => handleSelectItem(item)}
												/>
												<p className={styles.menuItem}>{item}</p>
											</div>
										))}
									</div>
								</>
							);
						})}
					</div>
				)}
			</div>

			<div className={styles.buttonBox}>
				{isLoading ? (
					<Button>
						<Loading backgroundColor='orange' />
					</Button>
				) : (
					<Button
						state={tags.length === 0 ? 'disabled' : 'default'}
						onClick={() => {
							setIsLoading(true);
							setTimeout(() => {
								setIsLoading(false);
								onClick();
							}, 3000);
						}}
					>
						적용하기
					</Button>
				)}
			</div>
		</>
	);
}
