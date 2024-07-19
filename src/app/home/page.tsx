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
import { useRouter } from 'next/navigation';
import { postCreateMyMenu } from '@/api/postCreateMyMenu';
import { apiRoutes } from '@/_lib/apiRoutes';
import { getUserName } from '@/api/getUserName';
import Loading from '@/components/Loading';

export default function Home() {
	const { tab } = useHomeStore();
	const [isInformOpen, setIsInformOpen] = useState<boolean>(false);
	const route = useRouter();
	const [defaultMyMenuName, setDefaultMyMenuName] = useState<string>('');
	const [user, setUser] = useState<string>('');

	// const { mutate: getAccess } = useMutation({
	// 	mutationFn: getAccessToken,
	// 	mutationKey: ['refresh'],
	// 	onSuccess: (token: string) => {
	// 		useAuthStore.setState({ isLogin: true, accessToken: token });
	// 	},
	// });

	const { data } = useQuery<IGetUserNameType>({
		queryKey: ['USER_NAME'],
		queryFn: getUserName,
	});

	useEffect(() => {
		if (data) {
			setUser(data.username);
		}
	}, [data]);

	// useEffect(() => {
	// 	const current = window.location.href;
	// 	const { accessToken } = useAuthStore.getState();
	// 	if (current && current.includes('molip.site') && accessToken === '') {
	// 		getAccess();
	// 	}
	// }, []);

	const { data: myMenuList, isLoading } = useQuery<IGetMyMenuType[]>({
		queryKey: ['MY_MENU_LIST'],
		queryFn: getMyMenuList,
	});

	const { data: teamMenuList } = useQuery<IGetTeamMenuType[]>({
		queryKey: ['TEAM_MENU_LIST'],
		queryFn: getTeamMenuList,
	});

	useEffect(() => {
		if (user && myMenuList && myMenuList.length > 0) {
			console.log(user);
			let index = 1;
			// 사용자 이름 받아오면 그걸로 수정해야함
			let newValue = `${user}의메뉴판`;
			while (index <= myMenuList.length) {
				myMenuList.map((menuItem) => {
					menuItem.name.includes(`${menuItem.userName}의메뉴판${index}`) &&
						index++;
					newValue = `${menuItem.userName}의메뉴판(${index})`;
				});
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
									myMenuList === null || myMenuList.length === 0 ? (
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
