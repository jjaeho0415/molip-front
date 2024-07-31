import React, { Dispatch, SetStateAction, useEffect } from 'react';
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
	setIsMoreModalOpen: Dispatch<SetStateAction<number>>;
	setIsAllPeopleAdded: Dispatch<SetStateAction<boolean>>;
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

	const { data: addedMembers, isLoading } = useQuery<IGetAddedUserInfo>({
		queryKey: ['MENU_ADDED_MEMBERS_INFO', id],
		queryFn: () => getHasMenuAddedMembers(id),
	});

	useEffect(() => {
		if (addedMembers) {
			const allPeopleAdded =
				addedMembers.addedMenuUserCount === addedMembers.teamMembersNum;
			setIsAllPeopleAdded(allPeopleAdded);
		}
	}, [addedMembers, setIsAllPeopleAdded]);

	const handleMenuItemClick = () => {
		if (addedMembers) {
			if (addedMembers.addedMenuUserCount === addedMembers.teamMembersNum) {
				router.push(`/menu?menuId=${id}&menuName=${menuName}`);
			} else {
				router.push(`/teamMenuPage?menuName=${menuName}&menuId=${id}`);
			}
		}
	};

	return (
		<>
			{!isLoading && (
				<>
					<div
						className={`${styles.itemContainer} ${!hasUserAddedMenu && styles.hasAddedMenu} ${addedMembers?.addedMenuUserCount !== addedMembers?.teamMembersNum && hasUserAddedMenu && styles.isWaitingMenuAdd}`}
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
					{!isAllPeopleAdded &&
						(!hasUserAddedMenu ? (
							<p className={styles.menuAddP}>메뉴를 추가하세요.</p>
						) : (
							addedMembers?.addedMenuUserCount !==
								addedMembers?.teamMembersNum && (
								<p className={styles.menuAddP}>
									아직 팀원이 메뉴를 선택 중입니다. {'('}
									{addedMembers?.addedMenuUserCount}/
									{addedMembers?.teamMembersNum}명 완료{')'}
								</p>
							)
						))}
				</>
			)}
		</>
	);
}

export default TeamMenuItem;
