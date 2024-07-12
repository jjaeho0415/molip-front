import React, { useState } from 'react';
import styles from './teamMenuItem.module.css';
import MoreModal from '../modals/MoreModal';
import Image from 'next/image';

interface TeamMenuItemProps {
	menuTitle: string;
	teamTitle: string;
	teamNumber: number;
}

function TeamMenuItem({ menuTitle, teamTitle, teamNumber }: TeamMenuItemProps) {
	const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);

	return (
		<>
			<div className={styles.itemContainer}>
				<div className={styles.titleSection}>
					<p className={styles.teamTitle}>{teamTitle}</p>
					<p className={styles.menuTitle}>{menuTitle}</p>
				</div>
				<Image
					alt='moreIcon'
					src='/svg/moreIcon.svg'
					width={24}
					height={24}
					onClick={(e) => {
						e.preventDefault();
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
								menuTitle={menuTitle}
								teamNumber={teamNumber}
								teamTitle={teamTitle}
								pageType='outsideTeamMenu'
							/>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default TeamMenuItem;
