import React, { Dispatch, SetStateAction } from 'react';
import styles from './styles/voteAlertModal.module.css';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/navigation';
import ModalButton from '../buttons/ModalButton';

interface VoteAlertModalProps {
	setIsVoteAlertModalOpen: Dispatch<SetStateAction<boolean>>;
	menuId: number;
	menuName: string;
}

function VoteAlertModal({
	setIsVoteAlertModalOpen,
	menuId,
	menuName,
}: VoteAlertModalProps) {
	const router = useRouter();
	const handleYesClick = () => {
		router.push(`/vote?menuId=${menuId}&menuName=${menuName}`);
	};

    const closeModal = () => {
        setIsVoteAlertModalOpen(false);
    }
	return ReactDOM.createPortal(
		<>
			<div
				className={styles.overlay}
				onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
					if (event.target === event.currentTarget) {
						setIsVoteAlertModalOpen(false);
					}
				}}
			>
				<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
					<div className={styles.textSection}>
						<div className={styles.topTextSection}>
							<p>투표 완료 이후에는</p>
							<p>
								<span className={styles.emphasisText}>메뉴 수정이 불가</span>
								합니다
							</p>
						</div>
						<div className={styles.bottomTextSection}>
							<p>계속 하시겠습니까?</p>
						</div>
					</div>
					<div className={styles.bottomSection}>
						<ModalButton
							handleClick={closeModal}
							buttonText='아니요'
							color='gray'
						/>
						<ModalButton
							handleClick={handleYesClick}
							buttonText='예'
							color='orange'
						/>
					</div>
				</div>
			</div>
		</>,
		document.body,
	);
}

export default VoteAlertModal;
