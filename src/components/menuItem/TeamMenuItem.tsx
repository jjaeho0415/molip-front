import React, { useState } from 'react';
import styles from './teamMenuItem.module.css';
import MoreModal from '../modals/MoreModal';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getHasMenuAddedMembers } from '@/api/getHasMenuAddedMembers';
import { useQuery } from '@tanstack/react-query';

interface TeamMenuItemProps {
	menuName: string;
	teamTitle: string;
	teamNumber: number;
	id: number;
	hasUserAddedMenu: boolean;
}

function TeamMenuItem({
	menuName,
	teamTitle,
	teamNumber,
	id,
	hasUserAddedMenu,
}: TeamMenuItemProps) {
	const router = useRouter();
	const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);

	const { data: addedMembers } = useQuery<IGetAddedUserInfo>({
		queryKey: ['MENU_ADDED_MEMBERS_INFO'],
		queryFn: () => getHasMenuAddedMembers(id),
	});

	const handleMenuItemClick = () => {
		if (addedMembers) {
			if (addedMembers.addedMenuUserCount === addedMembers.teamMembersNum)
				router.push(`/menu?menuId=${id}&menuName=${menuName}`);
		} else {
			router.push(
				`/teamMenuPage?menuId=${id}&menuName=${menuName}&menuAdded=${hasUserAddedMenu}`,
			);
		}
	};

	return (
		<>
			<div className={styles.itemContainer} onClick={handleMenuItemClick}>
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
						isMoreModalOpen
							? setIsMoreModalOpen(false)
							: setIsMoreModalOpen(true);
					}}
					style={{ position: 'relative', cursor: 'pointer', zIndex: '1' }}
				/>
				{isMoreModalOpen && (
					<>
						<div
							style={{
								position: 'absolute',
								transform: 'translate(191.5px, 100px)',
								zIndex: '6',
							}}
						>
							<MoreModal
								menuTitle={menuName}
								teamNumber={teamNumber}
								teamTitle={teamTitle}
								pageType='outsideTeamMenu'
								menuId={id}
								setIsMoreModalOpen={setIsMoreModalOpen}
							/>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default TeamMenuItem;
