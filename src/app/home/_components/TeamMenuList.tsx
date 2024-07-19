import TeamMenuItem from '@/components/menuItem/TeamMenuItem';
import { useRouter } from 'next/navigation';
import React from 'react';
import styles from './styles/menuList.module.css';

interface TeamMenuListProps {
	menuList: IGetTeamMenuType[];
}

function TeamMenuList({ menuList }: TeamMenuListProps) {
	const route = useRouter();

	const handleMenuItemClick = () => {
		route.push('/menu');
	};

	return (
		<div className={styles.ListContainer}>
			{menuList.map((teamMenuItem, index) => (
				<TeamMenuItem
					teamTitle={teamMenuItem.teamName}
					menuTitle={teamMenuItem.teamBoardName}
					teamNumber={teamMenuItem.teamMembersNum}
					key={index}
					handleClick={handleMenuItemClick}
				/>
			))}
		</div>
	);
}

export default TeamMenuList;
