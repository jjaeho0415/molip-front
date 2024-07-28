import TeamMenuItem from '@/components/menuItem/TeamMenuItem';
import React, { useState } from 'react';
import styles from './styles/menuList.module.css';
import MoreModal from '@/components/modals/MoreModal';

interface TeamMenuListProps {
	menuList: IGetTeamMenuType[];
}

function TeamMenuList({ menuList }: TeamMenuListProps) {
	const [isMoreModalOpen, setIsMoreModalOpen] = useState<number>(-1);
	const [isAllPeopleAdded, setIsAllPeopleAdded] = useState<boolean>(false);

	return (
		<div className={styles.ListContainer}>
			{menuList.map((teamMenuItem, index) => (
				<div key={teamMenuItem.teamBoardId} className={styles.itemContainer}>
					<TeamMenuItem
						teamTitle={teamMenuItem.teamName}
						menuName={teamMenuItem.teamBoardName}
						key={index}
						index={index}
						id={teamMenuItem.teamBoardId}
						hasUserAddedMenu={teamMenuItem.hasUserAddedMenu}
						isMoreModalOpen={isMoreModalOpen}
						setIsMoreModalOpen={setIsMoreModalOpen}
						isAllPeopleAdded={isAllPeopleAdded}
						setIsAllPeopleAdded={setIsAllPeopleAdded}
					/>
					{isMoreModalOpen === index && (
						<div
							style={{
								position: 'absolute',
								transform: `${!isAllPeopleAdded ? 'translate(191.5px, -60px)' : 'translate(191.5px, -25px)'}`,
								zIndex: '6',
							}}
						>
							<MoreModal
								menuTitle={teamMenuItem.teamBoardName}
								teamNumber={teamMenuItem.teamMembersNum}
								teamTitle={teamMenuItem.teamName}
								pageType='outsideTeamMenu'
								menuId={teamMenuItem.teamBoardId}
								setIsMoreModalOpen={setIsMoreModalOpen}
							/>
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export default TeamMenuList;
