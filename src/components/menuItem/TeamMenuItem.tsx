import React, { useEffect, useState } from 'react';
import styles from './teamMenuItem.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getHasMenuAddedMembers } from '@/api/getHasMenuAddedMembers';
import { useQuery } from '@tanstack/react-query';

interface TeamMenuItemProps {
	menuName: string;
	teamTitle: string;
	id: number;
	hasUserAddedMenu: boolean;
	index: number;
	isMoreModalOpen: number;
	setIsMoreModalOpen: React.Dispatch<React.SetStateAction<number>>;
	setIsAllPeopleAdded: React.Dispatch<React.SetStateAction<boolean>>;
	isAllPeopleAdded: boolean;
}

function TeamMenuItem({
	menuName,
	teamTitle,
	isMoreModalOpen,
	id,
	hasUserAddedMenu,
	index,
	setIsMoreModalOpen,
	setIsAllPeopleAdded,
	isAllPeopleAdded,
}: TeamMenuItemProps) {
	const router = useRouter();

	const { data: addedMembers } = useQuery<IGetAddedUserInfo>({
		queryKey: ['MENU_ADDED_MEMBERS_INFO', id],
		queryFn: () => getHasMenuAddedMembers(id),
	});

	useEffect(() => {
		if (addedMembers)
			setIsAllPeopleAdded(
				addedMembers.addedMenuUserCount === addedMembers.teamMembersNum
					? true
					: false,
			);
	}, [addedMembers]);

	const handleMenuItemClick = () => {
		if (addedMembers) {
			if (isAllPeopleAdded)
				router.push(`/menu?menuId=${id}&menuName=${menuName}`);
			else {
				router.push(`/teamMenuPage?menuId=${id}&menuName=${menuName}`);
			}
		}
	};

	return (
		<>
			<div
				className={`${styles.itemContainer} ${!hasUserAddedMenu && styles.hasAddedMenu} ${!isAllPeopleAdded && hasUserAddedMenu && styles.isWaitingMenuAdd}`}
				onClick={handleMenuItemClick}
			>
				<div className={styles.titleSection}>
					<p className={styles.teamTitle}>{teamTitle}</p>
					<p className={styles.menuTitle}>{menuName}</p>
				</div>
				<Image
					alt='moreIcon'
					src='/svg/moreIcon.svg'
					width={24}
					height={24}
					onClick={(e) => {
						e.stopPropagation();
						isMoreModalOpen !== index
							? setIsMoreModalOpen(index)
							: setIsMoreModalOpen(-1);
					}}
					style={{ position: 'relative', cursor: 'pointer', zIndex: '1' }}
				/>
			</div>
			{!hasUserAddedMenu && !isAllPeopleAdded && (
				<p className={styles.menuAddP}>메뉴를 추가하세요.</p>
			)}
			{hasUserAddedMenu && !isAllPeopleAdded && (
				<p className={styles.menuAddP}>
					아직 팀원이 메뉴를 선택 중입니다. {'('}
					{addedMembers?.addedMenuUserCount}/{addedMembers?.teamMembersNum}명
					완료{')'}
				</p>
			)}
		</>
	);
}

export default TeamMenuItem;
