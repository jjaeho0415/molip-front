'use client';

import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './styles/modifyModal.module.css';
import ModalButton from '../buttons/ModalButton';
import ReactDOM from 'react-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchModifyTeamMenu } from '@/api/patchModifyTeamMenu';

interface ModifyModalProps {
	setIsModifyModalOpen: Dispatch<SetStateAction<boolean>>;
	setIsMoreModalOpen: Dispatch<SetStateAction<number>>;
	teamName: string;
	teamNumber: number;
	teamBoardId: number;
}

function ModifyModal({
	teamName,
	teamNumber,
	setIsModifyModalOpen,
	setIsMoreModalOpen,
	teamBoardId,
}: ModifyModalProps) {
	const queryClient = useQueryClient();
	const [name, setName] = useState<string>(teamName);
	const [isEmpty, setIsEmpty] = useState<boolean>(false);
	const [selectedNumber, setSelectedNumber] = useState<number>(teamNumber);

	const { mutate: editTeamInfo } = useMutation({
		mutationFn: () =>
			patchModifyTeamMenu(teamBoardId, {
				teamName: name,
				teamMembersNum: selectedNumber,
			}),
		mutationKey: ['EDIT_TEAM_MENU_INFO', teamBoardId, name, selectedNumber],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['TEAM_MENU_LIST'] });
			queryClient.invalidateQueries({ queryKey: ['MENU_ADDED_MEMBERS_INFO'] });
			setIsModifyModalOpen(false);
			setIsMoreModalOpen(-1);
			alert('팀 정보 수정 성공!');
		},
		onError: (error) => console.error(error),
	});

	const handleNumberSelect = (num: number) => {
		if (teamNumber <= num) {
			setSelectedNumber(num);
		}
	};

	const handleSave = (): void => {
		if (name === '') {
			setIsEmpty(true);
			return;
		}
		editTeamInfo();
		setIsEmpty(false);
	};

	const closeModal = (): void => {
		setIsModifyModalOpen(false);
	};

	const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};
	const items = [2, 3, 4, 5, 6, 7, 8];

	return ReactDOM.createPortal(
		<>
			<div
				className={styles.overlay}
				onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
					if (event.target === event.currentTarget) {
						setIsModifyModalOpen(false);
					}
				}}
			>
				<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
					<div className={styles.topSection}>팀 정보 수정</div>
					<div className={styles.midSection}>
						{isEmpty ? (
							<p className={`${styles.midTitle} ${styles.empty}`}>
								팀 이름을 입력하세요.*
							</p>
						) : (
							<p className={styles.midTitle}>팀 이름을 입력하세요.</p>
						)}

						<input
							value={name}
							placeholder='팀 이름'
							onChange={(e) => inputChange(e)}
							className={styles.inputSection}
						/>
					</div>
					<div className={styles.bottomSection}>
						<div>
							<p className={styles.bottomTitle}>인원수를 선택하세요.</p>
							<p className={styles.bottomNotice}>
								현재 인원보다 적은 인원은 선택할 수 없습니다.
							</p>
						</div>

						<div className={styles.teamNumberSelect}>
							{items.map((item, index) => (
								<div
									key={index}
									className={`${styles.teamNumberItem} ${selectedNumber === item ? styles.selected : ''}`}
									onClick={() => handleNumberSelect(item)}
								>
									{item}명
								</div>
							))}
						</div>
					</div>
					<div className={styles.buttonSection}>
						<ModalButton
							buttonText='취소'
							handleClick={closeModal}
							color='gray'
						/>
						<ModalButton
							buttonText='확인'
							handleClick={handleSave}
							color='orange'
						/>
					</div>
				</div>
			</div>
		</>,
		document.body,
	);
}

export default ModifyModal;
