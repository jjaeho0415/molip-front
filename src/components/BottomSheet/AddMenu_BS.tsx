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
import { useQuery } from '@tanstack/react-query';
import { getMyMenu } from '@/api/getMyMenu';

interface IAddMenu {
	onClick: () => void;
	myMenuList: IGetMyMenuType[] | undefined;
}
export default function AddMenu_BS({ onClick, myMenuList }: IAddMenu) {
	const [isShowSelectBox, setIsShowSelectBox] = useState<boolean>(false);
	const [selectedMyMenu, setSelectedMyMenu] = useState<string>('');
	const [selectedPostAddMenu, setSelectedPostAddMenu] = useState<number[]>([]);
	const [selectedAddMenu, setSelectedAddMenu] = useState<string[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedBoardId, setSelectedBoardId] = useState<number>(-1);

	const { data: menus, isLoading: isGetMyMenuLoading } = useQuery<
		IGetMyCategoryMenuType[]
	>({
		queryKey: ['MY_MENU_LIST', selectedBoardId],
		queryFn: () => getMyMenu(selectedBoardId),
	});

	const handleSelectItem = (item: string) => {
		if (selectedAddMenu.includes(item)) {
			const newTagArr = selectedAddMenu.filter((menuItem) => menuItem !== item);
			setSelectedAddMenu(newTagArr);
		} else {
			setSelectedAddMenu([...selectedAddMenu, item]);
		}
	};

	const handleDeleteItem = (item: string) => {
		if (selectedAddMenu.includes(item)) {
			const newTagArr = selectedAddMenu.filter((menuItem) => menuItem !== item);
			setSelectedAddMenu(newTagArr);
		}
	};

	const handleMyBoardClick = (board: IGetMyMenuType) => {
		setSelectedMyMenu(board.name);
		setSelectedPostAddMenu([...selectedPostAddMenu, board.personalBoardId]);
		setSelectedBoardId(board.personalBoardId);
		setIsShowSelectBox(!isShowSelectBox);
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.menuBoard}>
					{selectedAddMenu.length === 0 ? (
						<p className={styles.placeholder}>메뉴를 선택하세요.</p>
					) : (
						selectedAddMenu.map((tag, idx) => (
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
					{myMenuList?.map((board, index) => (
						<li
							className={styles.li}
							key={index}
							value={board.name}
							onClick={() => handleMyBoardClick(board)}
						>
							{board.name}
						</li>
					))}
				</ul>
				{selectedMyMenu !== '' && (
					<p className={styles.menuSub}>
						메뉴를 선택해주세요.
						<span className={styles.subSpan}>최대 10개</span>
					</p>
				)}
				{selectedMyMenu !== '' && isGetMyMenuLoading ? (
					<Loading backgroundColor='white' />
				) : (
					<div className={styles.menuList}>
						{menus?.map((menuBoard, index) => {
							return (
								<>
									<p className={styles.category}>{menuBoard.category}</p>
									<div className={styles.categoryBox} key={index}>
										{menuBoard?.menu?.map((item, idx) => (
											<div key={idx} className={styles.menuItemBox}>
												<Image
													className={styles.checkBox}
													src={
														selectedAddMenu.includes(item.menuName)
															? Icon_checked
															: Icon_unchecked
													}
													width={24}
													height={24}
													alt='checkBox'
													onClick={() => handleSelectItem(item.menuName)}
												/>
												<p className={styles.menuItem}>{item.menuName}</p>
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
						state={selectedAddMenu.length === 0 ? 'disabled' : 'default'}
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
