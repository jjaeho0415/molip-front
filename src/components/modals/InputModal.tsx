'use client';
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import styles from './styles/inputModal.module.css';
import ModalButton from '../buttons/ModalButton';
import ReactDOM from 'react-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchModifyMyMenu } from '@/api/patchModifyMyMenu';
import useHomeStore from '@/app/home/store/useHomeStore';
import { patchModifyTeamMenu } from '@/api/patchModifyTeamMenu';
import { useRouter } from 'next/navigation';

interface InputModalProps {
	setIsInputModalOpen: Dispatch<SetStateAction<boolean>>;
	setIsMoreModalOpen: Dispatch<SetStateAction<boolean>>;
	titleText: string;
	menuId: number;
}

function InputModal({
	setIsInputModalOpen,
	setIsMoreModalOpen,
	titleText,
	menuId,
}: InputModalProps) {
	const [value, setValue] = useState<string>(titleText);
	const [isEmpty, setIsEmpty] = useState<boolean>(false);
	const { tab } = useHomeStore();
	const current = window.location.href;
	const route = useRouter();
	const queryClient = useQueryClient();
	const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const closeModal = (): void => {
		setIsInputModalOpen(false);
	};

	const { mutate: editName } = useMutation({
		mutationFn: () => {
			if (tab === 'my') {
				return patchModifyMyMenu(menuId, value);
			} else {
				return patchModifyTeamMenu(menuId, {
					teamBoardName: value,
				});
			}
		},
		onSuccess: () => {
			if (tab === 'my') {
				queryClient.invalidateQueries({ queryKey: ['MY_MENU_LIST'] });
			} else {
				queryClient.invalidateQueries({ queryKey: ['TEAM_MENU_LIST'] });
			}
			setIsEmpty(false);
			setIsInputModalOpen(false);
			setIsMoreModalOpen(false);
			alert('메뉴판 이름 수정 성공!');
			if (current.includes('home')) {
				tab === 'my'
					? queryClient.invalidateQueries({ queryKey: ['MY_MENU_LIST'] })
					: queryClient.invalidateQueries({ queryKey: ['TEAM_MENU_LIST'] });
			} else {
				route.push(`menu?menuId=${menuId}&menuName=${value}`);
			}
		},
		onError: (error) => console.error(error),
	});

	const handleSave = (): void => {
		if (value === '') {
			setIsEmpty(true);
			return;
		}
		editName();
	};

	return ReactDOM.createPortal(
		<>
			<div
				className={styles.overlay}
				onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
					if (event.target === event.currentTarget) {
						setIsInputModalOpen(false);
					}
				}}
			>
				<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
					<div className={styles.topSection}>
						{!isEmpty ? (
							<p className={styles.titleSection}>메뉴판의 이름을 입력하세요.</p>
						) : (
							<p className={`${styles.titleSection} ${styles.empty}`}>
								메뉴판의 이름을 입력하세요.*
							</p>
						)}

						<input
							value={value}
							onClick={(e) => e.stopPropagation()}
							onChange={(e) => inputChange(e)}
							className={styles.inputSection}
						/>
					</div>
					<div className={styles.bottomSection}>
						<ModalButton
							handleClick={closeModal}
							buttonText='취소'
							color='gray'
						/>
						<ModalButton
							handleClick={handleSave}
							buttonText='확인'
							color='orange'
						/>
					</div>
				</div>
			</div>
		</>,
		document.body,
	);
}

export default InputModal;
