'use client';

import Header from '@/components/Header';
import styles from './invitation.module.css';
import ModalButton from '@/components/buttons/ModalButton';
import LoginImage from '../../../public/svg/kakao_login_large_wide.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../login/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { postInvite } from '@/api/postInvite';
import { useEffect, useState } from 'react';

export default function Guest_Invitation() {
	const router = useRouter();
	const { isLogin } = useAuthStore.getState();
	const [teamMenuId, setTeamMenuId] = useState<string | null>('');
	const [teamMenuName, setTeamMenuName] = useState<string | null>('');

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const menuId = localStorage.getItem('teamMenu_Id');
			setTeamMenuId(menuId);
			const menuName = localStorage.getItem('teamMenu_Name');
			setTeamMenuName(menuName);
		}
	}, []);

	const { mutate: postInviteAccept } = useMutation<IPostInviteType>({
		mutationFn: () => {
			if (teamMenuId) {
				return postInvite(teamMenuId);
			} else {
				return Promise.reject(new Error('teamMenuId is null'));
			}
		},
		onSuccess: (data) => {
			localStorage.setItem('teamMenu_Id', String(data.teamBoardId));
			router.push(
				`/teamMenuPage?menuId=${data.teamBoardId}&menuName=${data.teamBoardName}`,
			);
		},
	});

	const handleYesClick = () => {
		teamMenuId && postInviteAccept();
	};

	const handleLogin = () => {
		sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
		window.location.href = 'https://api.molip.site/oauth2/authorization/kakao';
	};

	return (
		<>
			<Header />
			<div className={styles.ContentsContainer}>
				<div className={styles.modal}>
					<div
						className={`${styles.contentSection} ${!isLogin && styles.textDisabled}`}
					>
						<p className={styles.mainTitle}>{"'"}{teamMenuName}{"'"}</p>
						<p className={styles.subTitle}>초대를 수락하시겠습니까?</p>
					</div>
					<div className={styles.buttonSection}>
						<ModalButton
							buttonText='아니요'
							handleClick={() => {
								router.push('/');
							}}
							color={isLogin ? 'gray' : 'disabled'}
							cursor={isLogin ? true : false}
						/>
						<ModalButton
							buttonText='예'
							handleClick={handleYesClick}
							color={isLogin ? 'orange' : 'disabled'}
							cursor={isLogin ? true : false}
						/>
					</div>
					{!isLogin && (
						<>
							<p className={styles.loginText}>먼저 로그인 해주세요.</p>
							<Image
								className={styles.kakaoBtn}
								src={LoginImage}
								width={350}
								height={60}
								alt='login'
								onClick={handleLogin}
							/>
						</>
					)}
				</div>
			</div>
		</>
	);
}
