import React, { Dispatch, SetStateAction } from 'react';
import styles from './myMenuItem.module.css';
import Image from 'next/image';

interface MyMenuItemProps {
	menuTitle: string;
	handleClick: () => void;
	index: number;
	isMoreModalOpen: number;
	setIsMoreModalOpen: Dispatch<SetStateAction<number>>;
}

function MyMenuItem({
	menuTitle,
	handleClick,
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
