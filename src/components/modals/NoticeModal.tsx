'use client';

import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles/noticeModal.module.css';
import ModalButton from '../buttons/ModalButton';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';
import { postLogout } from '@/api/postLogout';

interface NoticeModalProps {
	setIsNoticeModalOpen: Dispatch<SetStateAction<boolean>>;
	titleText: string;
	isLogout?: boolean;
}

function NoticeModal({
	setIsNoticeModalOpen,
	titleText,
	isLogout = false,
}: NoticeModalProps) {
	const route = useRouter();
	const closeModal = (): void => {
		setIsNoticeModalOpen(false);
	};

	const { clearLoginState } = useAuthStore();
	const { mutate: logout } = useMutation({
		mutationFn: postLogout,
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
			setIsNoticeModalOpen(false);
			route.push('/home');
		}
		setIsNoticeModalOpen(false);
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
			<div className={styles.modal}>
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
