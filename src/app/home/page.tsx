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
import { useRouter } from 'next/navigation';
import useHomeStore from './store/useHomeStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../login/store/useAuthStore';
import { getAccessToken } from '@/api/postRefresh';
import { getMyMenuList } from '@/api/getMyMenuList';
import { getTeamMenuList } from '@/api/getTeamMenuList';
import Loading from '@/components/Loading';

export default function Home() {
	const { tab } = useHomeStore();
	const [isInformOpen, setIsInformOpen] = useState<boolean>(false);
	const route = useRouter();

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

	const { data: teamMenuList } = useQuery<IGetTeamMenuType[]>({
		queryKey: ['TEAM_MENU_LIST'],
		queryFn: getTeamMenuList,
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
			route.push('/createMyMenu');
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
