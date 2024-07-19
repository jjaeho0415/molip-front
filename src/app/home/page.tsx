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
import { getMyMenuList } from '@/api/getMyMenuList';
import { getTeamMenuList } from '@/api/getTeamMenuList';
import { useRouter } from 'next/navigation';
import { postCreateMyMenu } from '@/api/postCreateMyMenu';
import { getUserName } from '@/api/getUserName';
import Loading from '@/components/Loading';
import { useAuthStore } from '../login/store/useAuthStore';
import { getAccessToken } from '@/api/postRefresh';

export default function Home() {
	const { tab } = useHomeStore();
	const [isInformOpen, setIsInformOpen] = useState<boolean>(false);
	const route = useRouter();
	const [defaultMyMenuName, setDefaultMyMenuName] = useState<string>('');
	const [user, setUser] = useState<string>('');

	const { mutate: getAccess } = useMutation<string | null>({
		mutationFn: getAccessToken,
		mutationKey: ['refresh'],
		onSuccess: (token) => {
			useAuthStore.setState({ isLogin: true, accessToken: token });
		},
	});

	const { data: userName } = useQuery<IGetUserNameType>({
		queryKey: ['USER_NAME'],
		queryFn: getUserName,
	});

	useEffect(() => {
		if (userName) {
			setUser(userName.username);
		}
	}, [userName]);
	useEffect(() => {
		const current = window.location.href;
		const { accessToken } = useAuthStore.getState();
		if (current && current.includes('molip.site') && accessToken === '') {
			getAccess();
		}
	}, []);

	const { data: myMenuList, isLoading } = useQuery<IGetMyMenuType[]>({
		queryKey: ['MY_MENU_LIST'],
		queryFn: getMyMenuList,
	});

	const { data: teamMenuList } = useQuery<IGetTeamMenuType[]>({
		queryKey: ['TEAM_MENU_LIST'],
		queryFn: getTeamMenuList,
	});

	useEffect(() => {
		console.log(myMenuList, teamMenuList);
	}, [myMenuList, teamMenuList]);

	useEffect(() => {
		if (myMenuList && myMenuList.length > 0) {
			let index = 1;
			let newValue = `${user}의메뉴판(1)`;
			const names = myMenuList.map((menuItem) => menuItem.name);
			while (names.includes(`${user}의메뉴판(${index})`)) {
				index++;
			}
			if (index > 1) {
				newValue = `${user}의메뉴판(${index})`;
			}
			setDefaultMyMenuName(newValue);
		} else {
			setDefaultMyMenuName('OOO의메뉴판');
		}
	}, [myMenuList, user]);

	const { mutate: createMyMenu } = useMutation<IGetMyMenuType>({
		mutationFn: () => postCreateMyMenu(defaultMyMenuName),
		mutationKey: ['CREATE_MY_MENU'],
		onSuccess: (data) => {
			route.push(`/createMyMenu?menuName=${data.name}`);
		},
		onError: (error) => alert(error),
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

	// if (tab === null) {
	// 	return (
	// 		<div className={styles.loading}>
	// 			<Loading backgroundColor='white' />
	// 		</div>
	// 	);
	// }

	return (
		<>
			<Header />
			<TabNavigation />
			{isLoading ? (
				<Loading backgroundColor='white' />
			) : (
				<>
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
										<MenuEmpty myMenuIsEmpty={true} />
									) : (
										<MyMenuList menuList={myMenuList} />
									)
								) : tab === 'team' && teamMenuList.length === 0 ? (
									<MenuEmpty myMenuIsEmpty={true} />
								) : (
									tab === 'team' && <TeamMenuList menuList={teamMenuList} />
								)}
							</>
						)}
					</div>
				</>
			)}
		</>
	);
}
