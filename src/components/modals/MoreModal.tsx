import React, { useState } from 'react';
import styles from './styles/moreModal.module.css';
import InputModal from './InputModal';
import NoticeModal from './NoticeModal';
import ModifyModal from './ModifyModal';

interface MoreModalProps {
	pageType:
		| 'insideTeamMenu'
		| 'outsideTeamMenu'
		| 'insideMyMenu'
		| 'outsideMyMenu';
	menuTitle: string;
	teamTitle: string;
	teamNumber: number;
}

function MoreModal({
	pageType,
	menuTitle,
	teamTitle,
	teamNumber,
}: MoreModalProps) {
	const [isInputModalOpen, setIsInputModalOpen] = useState<boolean>(false);
	const [isNoticeModalOpen, setIsNoticeModalOpen] = useState<boolean>(false);
	const [isModifyModalOpen, setIsModifyModalOpen] = useState<boolean>(false);
	const items =
		pageType === 'insideTeamMenu'
			? ['팀명/인원수 수정', '메뉴판 이름 변경', '메뉴판 삭제', '공유하기']
			: pageType === 'outsideTeamMenu'
				? ['팀명/인원수 수정', '메뉴판 이름 변경', '메뉴판 삭제']
				: pageType === 'insideMyMenu'
					? ['메뉴판 이름 변경', '메뉴판 삭제', '공유하기']
					: ['메뉴판 이름 변경', '메뉴판 삭제'];

	const handleClick = (item: string) => {
		if (item === '팀명/인원수 수정') {
			setIsModifyModalOpen(true);
		} else if (item === '메뉴판 이름 변경') {
			setIsInputModalOpen(true);
		} else if (item === '메뉴판 삭제') {
			setIsNoticeModalOpen(true);
		} else {
			// 공유하기
			return;
		}
	};

	return (
		<>
			<div className={styles.modal}>
				{items.map((item, index) => (
					<div
						key={index}
						className={styles.itemSection}
						onClick={() => handleClick(item)}
					>
						{item}
					</div>
				))}
			</div>
			{isInputModalOpen && (
				<InputModal
					setIsInputModalOpen={setIsInputModalOpen}
					titleText={menuTitle}
				/>
			)}
			{isNoticeModalOpen && (
				<NoticeModal
					setIsNoticeModalOpen={setIsNoticeModalOpen}
					titleText={menuTitle}
				/>
			)}
			{isModifyModalOpen && (
				<ModifyModal
					setIsModifyModalOpen={setIsModifyModalOpen}
					teamName={teamTitle}
					teamNumber={teamNumber}
				/>
			)}
		</>
	);
}

export default MoreModal;
