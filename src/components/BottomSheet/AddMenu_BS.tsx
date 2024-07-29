import { Dispatch, SetStateAction, useState } from 'react';
import styles from './addMenu.module.css';
import Image from 'next/image';
import Icon_down from '../../../public/icons/down.svg';
import Icon_up from '../../../public/icons/up.svg';
import Button from '../buttons/Button';
import Icon_unchecked from '../../../public/icons/checkBox/checkBox_unchecked.svg';
import Icon_checked from '../../../public/icons/checkBox/checkBox_checked.svg';
import OptionButton from '../buttons/OptionButton';
import Loading from '../Loading';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyMenu } from '@/api/getMyMenu';
import { useRouter } from 'next/navigation';
import { AddMenuToTeamMenu } from '@/api/addMenuToTeamMenu';
import AlertModal from '../modals/AlertModal';
import useBottomSheet from '@/hooks/useBottomSheet';

interface IAddMenu {
	onClick: () => void;
	myMenuList: IGetMyMenuType[] | undefined;
	teamBoardId: number;
	boardName: string;
	isAllPeopleAdded: boolean;
	setIsUserAddedMenu: Dispatch<SetStateAction<boolean>>;
}
export default function AddMenu_BS({
	onClick,
	myMenuList,
	teamBoardId,
	boardName,
	isAllPeopleAdded,
	setIsUserAddedMenu,
}: IAddMenu) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [isShowSelectBox, setIsShowSelectBox] = useState<boolean>(false);
	const [selectedMyMenu, setSelectedMyMenu] = useState<string>('');
	const [selectedAddMenu, setSelectedAddMenu] = useState<
		{ menuName: string; menuId: number }[]
	>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedBoardId, setSelectedBoardId] = useState<number>(-1);
	const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
	const { setIsOpen } = useBottomSheet();

	const { data: menus, isLoading: isGetMyMenuLoading } = useQuery<
		IGetMyCategoryMenuType[] | undefined
	>({
		queryKey: ['MY_MENU_LIST', selectedBoardId],
		queryFn: () => {
			if (selectedMyMenu !== '') {
				return getMyMenu(selectedBoardId);
			} else {
				return;
			}
		},
	});

	const { mutate: addMenu } = useMutation({
		mutationFn: async (menuIdList: number[]) => {
			await AddMenuToTeamMenu(teamBoardId, { menuIds: menuIdList });
		},
		mutationKey: ['ADD_MENU_TO_TEAM_MENU'],
		onSuccess: () => {
			setIsUserAddedMenu(true);
			queryClient.invalidateQueries({
				queryKey: ['TEAM_MENU_ITEM', teamBoardId],
			});
			queryClient.invalidateQueries({
				queryKey: ['MENU_ADDED_MEMBERS_INFO'],
			});
			alert('메뉴가 추가되었습니다.');
			if (isAllPeopleAdded)
				router.push(`/menu?menuId=${teamBoardId}&menuName=${boardName}`);
			else
				router.push(
					`/teamMenuPage?menuId=${selectedBoardId}&menuName=${boardName}`,
				);
		},
		onSettled: () => {
			setIsLoading(false);
			
			onClick();
		},
	});

	const handleSelectItem = (item: IMenuItemType) => {
		const isMenuExist = selectedAddMenu.some(
			(menu) => menu.menuId === item.menuId,
		);

		if (!isMenuExist) {
			if (selectedAddMenu.length >= 10) {
				setIsAlertModalOpen(true);
				return;
			}
			setSelectedAddMenu([
				...selectedAddMenu,
				{ menuName: item.menuName, menuId: item.menuId },
			]);
		} else {
			setSelectedAddMenu(
				selectedAddMenu.filter((menu) => menu.menuId !== item.menuId),
			);
		}
	};

	const handleDeleteItem = (item: { menuName: string; menuId: number }) => {
		const isMenuExist = selectedAddMenu.some(
			(menu) => menu.menuName === item.menuName,
		);
		if (isMenuExist) {
			const newSelectedArr = selectedAddMenu.filter(
				(menuItem) => menuItem !== item,
			);
			setSelectedAddMenu(newSelectedArr);
		}
	};

	const handleMyBoardClick = (board: IGetMyMenuType) => {
		setSelectedMyMenu(board.name);
		setSelectedBoardId(board.personalBoardId);
		setIsShowSelectBox(false);
	};

	const handleAddMenu = () => {
		if (selectedAddMenu.length === 0) {
			return;
		}
		setIsLoading(true);

		const menuIdList = selectedAddMenu.map((item) => item.menuId);
		addMenu(menuIdList);
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.menuBoard}>
					{selectedAddMenu.length === 0 ? (
						<p className={styles.placeholder}>메뉴를 선택하세요.</p>
					) : (
						selectedAddMenu.map((item, idx) => (
							<div className={styles.menuTag} key={idx}>
								<OptionButton
									state='selected'
									option={false}
									close={true}
									onClick={() => handleDeleteItem(item)}
								>
									{item.menuName}
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
														selectedAddMenu.some(
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
						onClick={handleAddMenu}
					>
						적용하기
					</Button>
				)}
			</div>
			{isAlertModalOpen && (
				<AlertModal setIsAlertModalOpen={setIsAlertModalOpen} max={10} />
			)}
		</>
	);
}
