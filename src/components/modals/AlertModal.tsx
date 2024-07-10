import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles/alertModal.module.css';
import Image from 'next/image';
import ModalButton from '../buttons/ModalButton';

interface AlertModalProps {
	setIsAlertModalOpen: Dispatch<SetStateAction<boolean>>;
	max: number;
}

function AlertModal({ setIsAlertModalOpen, max }: AlertModalProps) {
	return (
		<>
			<div
				className={styles.overlay}
				onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
					if (event.target === event.currentTarget) {
						setIsAlertModalOpen(false);
					}
				}}
			>
				<div className={styles.modal}>
					<div className={styles.contentSection}>
						<Image
							alt='checkIcon'
							width={48}
							height={48}
							src='/svg/checkIcon.svg'
						/>
						<p>메뉴는 최대 {max}개까지만</p>
						<p>선택 가능합니다.</p>
					</div>
					<div className={styles.buttonSection}>
						<ModalButton
							color='orange'
							buttonText='확인'
							handleClick={() => setIsAlertModalOpen(false)}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default AlertModal;
