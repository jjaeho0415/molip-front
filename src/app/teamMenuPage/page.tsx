'use client';

import Header from '@/components/Header';
import styles from './teamMenu.module.css';
import TabNavigation from '@/components/TabNavigation';
import TopNavBar from '@/components/TopNavBar';
import SmallInput from '@/components/InputBox/SmallInput';
import { useEffect, useState } from 'react';
import Icon_pencile from '../../../public/icons/Icon_pencil.svg';
import Image from 'next/image';
import Icon_kakao from '../../../public/svg/Icon_kakao.svg';
import Icon_copy from '../../../public/svg/Icon_copyURL.svg';
import BottomSheet from '@/components/BottomSheet/BottomSheet';
import RoundButton from '@/components/buttons/RoundButton';
import NoMenu_BS from '@/components/BottomSheet/NoMenu_BS';
import AddMenu_BS from '@/components/BottomSheet/AddMenu_BS';
import useBottomSheet from '@/hooks/useBottomSheet';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getMyMenuList } from '@/api/getMyMenuList';
import { getTeamMenuItem } from '@/api/getTeamMenuItem';
import { getHasMenuAddedMembers } from '@/api/getHasMenuAddedMembers';
import { useKakaoInvite } from '@/hooks/useKakaoInvite';
import { useAuthStore } from '../login/store/useAuthStore';
import { getInvite } from '@/api/getInvite';

export default function TeamMenuPage() {
	const { setIsOpen } = useBottomSheet();
	const searchParams = useSearchParams();
	const router = useRouter();
	const boardName = searchParams.get('menuName') as string;
	const teamBoardId = searchParams.get('menuId') as string;
	const [menuBoardName, setMenuBoardName] = useState<string>(boardName);
	const [myMenuNum, setMyMenu] = useState<number>();
	const [currentUrl, setCurrentUrl] = useState<string>('');
	const [isAllPeopleAdded, setIsAllPeopleAdded] = useState<boolean>(false);
	const [isUserAddedMenu, setIsUserAddedMenu] = useState<boolean>(false);
	const { handleKakaoInvite } = useKakaoInvite(currentUrl);
	const { isLogin } = useAuthStore.getState();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		!isLogin && router.push('/login');
	}, [isLogin]);

	useEffect(() => {
		setIsOpen(false);
	}, []);
	useEffect(() => {
		if (typeof window !== 'undefined') {
			setCurrentUrl(window.location.href);
			setMyMenu(Number(localStorage.getItem('myMenuNum')));
		}
	}, []);

	const {
		data: getIsTeam,
		isLoading: isTeamLoading,
		isFetching: isTeamFetching,
	} = useQuery<IGetInvite>({
		queryKey: ['IS_TEAM'],
		queryFn: () => getInvite(teamBoardId),
	});

	useEffect(() => {
		if (!isTeamLoading && getIsTeam !== undefined && !isTeamFetching) {
			localStorage.setItem('teamMenu_Id', String(teamBoardId));
			localStorage.setItem('teamMenu_Name', boardName);
			if (isLogin) {
				if (getIsTeam.isTeam === true) {
					setIsLoading(false);
				} else if (getIsTeam.isTeam === false) {
					router.push('/guest_invitation');
				}
			} else {
				router.push('/guest_invitation');
			}
		}
	}, [getIsTeam, isTeamLoading, isTeamFetching]);

	const handleClickButton = () => {
		setIsOpen(false);
	};

	const { data: teamMenuItem, refetch: refetchTeamMenuItem } =
		useQuery<IGetTeamMenuType | null>({
			queryKey: ['TEAM_MENU_ITEM', teamBoardId],
			queryFn: async () => getTeamMenuItem(teamBoardId),
			enabled: !isLoading,
		});

	const { data: addedMembers, refetch: refetchAddedMembers } =
		useQuery<IGetAddedUserInfo>({
			queryKey: ['MENU_ADDED_MEMBERS_INFO'],
			queryFn: () => getHasMenuAddedMembers(teamBoardId),
			enabled: !isLoading,
		});

	const { data: myMenuList } = useQuery<IGetMyMenuType[]>({
		queryKey: ['MY_MENU_LIST'],
		queryFn: getMyMenuList,
		enabled: !isLoading,
	});

	useEffect(() => {
		if (addedMembers) {
			if (addedMembers.addedMenuUserCount === addedMembers.teamMembersNum) {
				router.push(`/menu?menuId=${teamBoardId}&menuName=${boardName}`);
			} else {
				setIsAllPeopleAdded(
					addedMembers.addedMenuUserCount === addedMembers.teamMembersNum,
				);
			}
		}
		if (teamMenuItem) {
			setIsUserAddedMenu(teamMenuItem.hasUserAddedMenu);
		}
	}, [addedMembers, teamMenuItem]);

	const handleCopyClipBoard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			alert('클립보드에 링크가 복사되었어요.');
		} catch (err) {
			console.log(err);
		}
	};

	const handleReload = () => {
		refetchTeamMenuItem();
		refetchAddedMembers();
	};

	return (
		<>
			{!isLoading && (
				<>
					<Header />
					<TabNavigation />
					<TopNavBar backRoute='/home' />
					<div className={styles.contentsContainer}>
						<div className={styles.inputBox}>
							<SmallInput
								value={menuBoardName}
								setValue={setMenuBoardName}
								menuId={Number(teamBoardId)}
							></SmallInput>
							<Image src={Icon_pencile} width={36} height={36} alt='edit' />
						</div>
						<div className={styles.middleBox}>
							{!isAllPeopleAdded && isUserAddedMenu ? (
								<>
									<p className={styles.comment}>
										아직 팀원이 메뉴를 선택 중입니다.
									</p>
									<div className={styles.buttonBox}>
										<RoundButton
											property='메뉴추가완료'
											onClick={() => {
												return;
											}}
										/>
										<RoundButton property='새로고침' onClick={handleReload} />
									</div>
								</>
							) : (
								!isAllPeopleAdded &&
								!isUserAddedMenu && (
									<>
										<p className={styles.comment}>
											아직 메뉴를 추가하지 않았어요.
										</p>
										<RoundButton
											property='메뉴'
											onClick={() => {
												setIsOpen(true);
											}}
										/>
									</>
								)
							)}
						</div>

						<div className={styles.BottomBox}>
							<p className={styles.comment}>팀원 초대하기</p>

							<div className={styles.iconsBox}>
								<div
									className={styles.icon}
									onClick={() => handleKakaoInvite()}
								>
									<Image src={Icon_kakao} width={50} height={50} alt='kakao' />
									<p className={styles.iconName}>카카오톡</p>
								</div>
								<div
									className={styles.icon}
									onClick={() => handleCopyClipBoard(currentUrl)}
								>
									<Image src={Icon_copy} width={50} height={50} alt='kakao' />
									<p className={styles.iconName}>링크복사</p>
								</div>
							</div>
						</div>
						<p className={styles.bottomComment}>위로 올려 옵션을 선택하세요.</p>

						{myMenuNum === 0 ? (
							<BottomSheet size='small'>
								<NoMenu_BS teamBoardId={Number(teamBoardId)} />
							</BottomSheet>
						) : (
							<BottomSheet>
								<AddMenu_BS
									onClick={handleClickButton}
									myMenuList={myMenuList}
									teamBoardId={Number(teamBoardId)}
									boardName={boardName}
									isAllPeopleAdded={isAllPeopleAdded}
									setIsUserAddedMenu={setIsUserAddedMenu}
									isUserAddedMenu={isUserAddedMenu}
								/>
							</BottomSheet>
						)}
					</div>
				</>
			)}
		</>
	);
}
