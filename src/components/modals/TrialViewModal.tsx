import React, { Dispatch, RefObject, SetStateAction, useState } from 'react';
import styles from './styles/trialViewModal.module.css';
import ModalButton from '../buttons/ModalButton';
import ReactDOM from 'react-dom';
import { useRouter } from 'next/navigation';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';


interface TrialViewModalProps {
	setIsTrialModalOpen: Dispatch<SetStateAction<boolean>>;
	canvasRef?: RefObject<HTMLDivElement>;
}

function TrialViewModal({ setIsTrialModalOpen,canvasRef }: TrialViewModalProps) {
	const [isImageSaveBtnShow, setIsImageSaveBtnShow] = useState<boolean>(true);
	const route = useRouter();

	const closeModal = (): void => {
		setIsTrialModalOpen(false);
	};


		const handleImageSave = async () => {
			if (!canvasRef?.current) {
				return;
			}
			try {
				const div = canvasRef.current;
				const canvas = await html2canvas(div, { scale: 2 });
				canvas.toBlob((blob) => {
					if (blob !== null) {
						saveAs(blob, 'menuBoard.png');
					}
				});
				setIsImageSaveBtnShow(false);
			} catch (error) {
				alert('이미지 저장에 실패하였습니다.');
				console.error('Error converting div to image: ', error);
			}
		};
		
	

	const handleLogin = () => {
		route.push('/login')
	}

	return ReactDOM.createPortal(
		<>
			<div
				className={styles.overlay}
				onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
					if (event.target === event.currentTarget) {
						setIsTrialModalOpen(false);
					}
				}}
			>
				<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
					<div className={styles.topText}>
						<p>
							{' '}
							<span className={styles.orange}>우리 팀 전용 메뉴판</span>도
							만들어봐요!
						</p>{' '}
						<p>동료들과 메뉴 도장깨기 어떤가요?😆</p>
					</div>
					<div className={styles.loginSection}>
						<button className={styles.loginButton} onClick={handleLogin}>
							로그인
						</button>
						<p className={styles.loginDescription}>
							팀 메뉴판은 로그인 후 이용 가능해요.
						</p>
					</div>
					<div className={styles.modalButtonSection}>
						<ModalButton
							buttonText='닫기'
							handleClick={closeModal}
							color='gray'
						/>
						{isImageSaveBtnShow && (
							<ModalButton
								buttonText='이미지 저장'
								handleClick={handleImageSave}
								color='orange'
							/>
						)}
					</div>
				</div>
			</div>
		</>,
		document.body,
	);
}

export default TrialViewModal;
