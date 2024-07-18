'use client';

import Header from '@/components/Header';
import styles from './home.module.css';
import TabNavigation from '@/components/TabNavigation';
import { useEffect, useState } from 'react';
import Button from '@/components/buttons/Button';
import MyMenuList from './_components/MyMenuList';
import TeamMenuList from './_components/TeamMenuList';
import MenuEmpty from './_components/MenuEmpty';
import Image from 'next/image';
import InformationModal from './_components/InformationModal';
import useHomeStore from './store/useHomeStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../login/store/useAuthStore';
import { getAccessToken } from '@/api/postRefresh';
import { getMyMenuList } from '@/api/getMyMenuList';
import { getTeamMenuList } from '@/api/getTeamMenuList';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import { postCreateMyMenu } from '@/api/postCreateMyMenu';

export default function Home() {
	const { tab } = useHomeStore();
	const [isInformOpen, setIsInformOpen] = useState<boolean>(false);
	const route = useRouter();
	const [defaultMyMenuName, setDefaultMyMenuName] = useState<string>('');

	const { mutate: getAccess } = useMutation({
		mutationFn: getAccessToken,
		mutationKey: ['refresh'],
		onSuccess: (token: string) => {
			useAuthStore.setState({ isLogin: true, accessToken: token });
		},
	});

	useEffect(() => {
		const current = window.location.href;
		if (current && current.includes('molip.site')) {
			getAccess();
		}
	}, []);

	const { data: myMenuList } = useQuery<IGetMyMenuType[]>({
		queryKey: ['MY_MENU_LIST'],
		queryFn: getMyMenuList,
	});

	useEffect(() => {
		if (myMenuList && myMenuList.length > 0) {
			let index = 1;
			// 사용자 이름 받아오면 그걸로 수정해야함
			let newValue = `OOO의 메뉴판`;
			while (index <= myMenuList.length) {
				myMenuList.map((menuItem) => {
					menuItem.name.includes(`${menuItem.userName}의 메뉴판${index}`) &&
						index++;
					newValue = `${menuItem.userName}의 메뉴판(${index})`;
				});
			}
			setDefaultMyMenuName(newValue);
		} else {
			setDefaultMyMenuName('OOO의 메뉴판');
		}
	}, [myMenuList]);

	const { data: teamMenuList } = useQuery<IGetTeamMenuType[]>({
		queryKey: ['TEAM_MENU_LIST'],
		queryFn: getTeamMenuList,
	});

	const { mutate: createMyMenu } = useMutation({
		mutationFn: () => postCreateMyMenu(defaultMyMenuName),
		mutationKey: ['CREATE_MY_MENU'],
		onSuccess: () => {
			route.push(
				`/createMyMenu?menuName=${encodeURIComponent(defaultMyMenuName)}`,
			);
		},
		onError: (error) => console.error(error),
	});

	const handleInformClick = (): void => {
		if (isInformOpen) {
			setIsInformOpen(false);
			return;
		}
		setIsInformOpen(true);
	};

	const handleCreateMenuBoard = () => {
		if (tab === 'team') {
			route.push('/makeTeam');
		} else {
			createMyMenu();
		}
	};

	if (tab === null) {
		return (
			<div className={styles.loading}>
				<Loading backgroundColor='white' />
			</div>
		);
	}

	return (
		<>
			<Header />
			<TabNavigation />
			<div className={styles.createContainer}>
				<p className={styles.titleSection}>
					{tab === 'my'
						? '나의 메뉴판'
						: tab === 'team' && (
								<>
									팀 메뉴판
									<Image
										alt='informationIcon'
										width={32}
										height={32}
										src='/svg/informationIcon.svg'
										style={{ cursor: 'pointer' }}
										onClick={handleInformClick}
									/>
									{isInformOpen && (
										<div
											style={{
												position: 'absolute',
												transform: 'translate(13%, 80%)',
											}}
										>
											<InformationModal />
										</div>
									)}
								</>
							)}
				</p>
				<Button state='new' onClick={handleCreateMenuBoard}>
					+ 새로만들기
				</Button>
			</div>

			<div className={styles.Container}>
				{myMenuList && teamMenuList && (
					<>
						{tab === 'my' ? (
							myMenuList.length === 0 ? (
								<MenuEmpty
									myMenuIsEmpty={myMenuList.length === 0 ? true : false}
								/>
							) : (
								<MyMenuList menuList={myMenuList} />
							)
						) : tab === 'team' && teamMenuList.length === 0 ? (
							<MenuEmpty
								myMenuIsEmpty={myMenuList.length === 0 ? true : false}
							/>
						) : (
							tab === 'team' && <TeamMenuList menuList={teamMenuList} />
						)}
					</>
				)}
			</div>
		</>
	);
}
