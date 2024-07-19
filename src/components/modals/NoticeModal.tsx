'use client';

import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles/noticeModal.module.css';
import ModalButton from '../buttons/ModalButton';
import ReactDOM from 'react-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postLogout } from '@/api/postLogout';
import { deleteMyMenu } from '@/api/deleteMyMenu';
import useHomeStore from '@/app/home/store/useHomeStore';
import { deleteTeamMenu } from '@/api/deleteTeamMenu copy';

interface NoticeModalProps {
	setIsNoticeModalOpen: Dispatch<SetStateAction<boolean>>;
	titleText: string;
	isLogout?: boolean;
	menuId: number;
	setIsMoreModalOpen: Dispatch<SetStateAction<boolean>>;
}

function NoticeModal({
	setIsNoticeModalOpen,
	titleText,
	isLogout = false,
	menuId,
	setIsMoreModalOpen,
}: NoticeModalProps) {
	const { tab } = useHomeStore();
	const route = useRouter();
	const createMyMenu = useSearchParams();
	const defaultMenuId = createMyMenu.get('menuId');
	const queryClient = useQueryClient();

	const { mutate: deleteMenu } = useMutation({
		mutationFn: (id: number) => {
			if (tab === 'my') {
				return deleteMyMenu(id);
			} else {
				return deleteTeamMenu(id);
			}
		},
		mutationKey: ['DELETE_MENU_BOARD'],
		onSuccess: () => {
			setIsNoticeModalOpen(false);
			setIsMoreModalOpen(false);
			alert('메뉴판이 성공적으로 삭제되었습니다.');
			queryClient.invalidateQueries();
			route.push('/home');
		},
	});
	const closeModal = (): void => {
		setIsNoticeModalOpen(false);
	};

	const { clearLoginState } = useAuthStore();
	const { mutate: logout } = useMutation({
		mutationFn: postLogout,
		mutationKey: ['logout'],
		onSettled: () => {
			clearLoginState();
			setIsNoticeModalOpen(false);
			route.push('/');
		},
	});

	const handleDelete = (): void => {
		if (isLogout) {
			logout();
			return;
		}
		if (titleText === '') {
			deleteMenu(Number(defaultMenuId));
			return;
		}
		deleteMenu(menuId);
	};

	return ReactDOM.createPortal(
		<div
			className={styles.overlay}
			onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
				if (event.target === event.currentTarget) {
					setIsNoticeModalOpen(false);
				}
			}}
		>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={styles.contentSection}>
					{titleText && <p className={styles.mainTitle}>{`‘${titleText}’`}</p>}
					{!isLogout ? (
						<p className={styles.subTitle}>메뉴판을 삭제하실 건가요?</p>
					) : (
						<p className={styles.subTitle}>로그아웃 하시겠습니까?</p>
					)}
				</div>
				<div className={styles.buttonSection}>
					<ModalButton
						buttonText={isLogout ? '취소' : '아니오'}
						handleClick={closeModal}
						color='gray'
					/>
					<ModalButton
						buttonText={isLogout ? '로그아웃' : '예'}
						handleClick={handleDelete}
						color='orange'
					/>
				</div>
			</div>
		</div>,
		document.body,
	);
}

export default NoticeModal;
