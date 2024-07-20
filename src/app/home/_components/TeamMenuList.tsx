import TeamMenuItem from '@/components/menuItem/TeamMenuItem';
import React from 'react';
import styles from './styles/menuList.module.css';

interface TeamMenuListProps {
	menuList: IGetTeamMenuType[];
}

function TeamMenuList({ menuList }: TeamMenuListProps) {
	return (
		<div className={styles.ListContainer}>
			{menuList.map((teamMenuItem, index) => (
				<TeamMenuItem
					teamTitle={teamMenuItem.teamName}
					menuName={teamMenuItem.teamBoardName}
					teamNumber={teamMenuItem.teamMembersNum}
					key={index}
					id={teamMenuItem.teamBoardId}
					hasUserAddedMenu={teamMenuItem.hasUserAddedMenu}
				/>
			))}
		</div>
	);
}

export default TeamMenuList;
