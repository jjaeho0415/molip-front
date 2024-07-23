import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './myMenuItem.module.css';
import Image from 'next/image';
import MoreModal from '../modals/MoreModal';

interface MyMenuItemProps {
	menuTitle: string;
	handleClick: () => void;
	menuId: number;
	index: number;
	isMoreModalOpen: number;
	setIsMoreModalOpen: React.Dispatch<React.SetStateAction<number>>;
}

function MyMenuItem({
	menuTitle,
	handleClick,
	menuId,
	index,
	isMoreModalOpen,
	setIsMoreModalOpen,
}: MyMenuItemProps) {
	return (
		<>
			<div className={styles.itemContainer} onClick={handleClick}>
				<p className={styles.menuTitle}>{menuTitle}</p>
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
		</>
	);
}

export default MyMenuItem;
