'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './styles/inviteModal.module.css';
import ModalButton from '../buttons/ModalButton';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import Icon_kakao from '../../../public/svg/Icon_kakao.svg';
import Icon_copy from '../../../public/svg/Icon_copyURL.svg';
import { useKakaoInvite } from '@/hooks/useKakaoInvite';

interface InviteModalProps {
	setIsInviteModalOpen: Dispatch<SetStateAction<boolean>>;
	menuId: number;
	menuName: string;
}

function InviteModal({
	setIsInviteModalOpen,
	menuId,
	menuName,
}: InviteModalProps) {
	const [currentUrl, setCurrentUrl] = useState<string>('');
	const { handleKakaoInvite } = useKakaoInvite(currentUrl);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setCurrentUrl(
				`${window.location.origin}/teamMenuPage?menuName=${menuName}&menuId=${menuId}`,
			);
		}
	}, [menuId, menuName]);

	const handleClose = () => {
		setIsInviteModalOpen(false);
	};

	const handleCopyClipBoard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			alert('클립보드에 링크가 복사되었어요.');
		} catch (err) {
			console.log(err);
		}
	};

	return ReactDOM.createPortal(
		<>
			{menuId && menuName && (
				<>
					<div
						className={styles.overlay}
						onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
							if (event.target === event.currentTarget) {
								setIsInviteModalOpen(false);
							}
						}}
					>
						<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
							<div className={styles.mainContainer}>
								<p className={styles.inviteText}>팀원 초대하기</p>
								<div className={styles.iconsBox}>
									<div
										className={styles.icon}
										onClick={() => handleKakaoInvite()}
									>
										<Image
											src={Icon_kakao}
											width={50}
											height={50}
											alt='kakao'
										/>
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
							<div className={styles.bottomSection}>
								<ModalButton
									buttonText='닫기'
									handleClick={handleClose}
									color='gray'
								/>
							</div>
						</div>
					</div>
				</>
			)}
		</>,
		document.body,
	);
}

export default InviteModal;
