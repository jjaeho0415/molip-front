import React, {  useState } from 'react';
import styles from './myMenuItem.module.css';
import Image from 'next/image';
import MoreModal from '../modals/MoreModal';

interface MyMenuItemProps {
	menuTitle: string;
	handleClick: () => void;
	menuId: number;
}

function MyMenuItem({ menuTitle, handleClick, menuId }: MyMenuItemProps) {
	const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);

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
								transform: 'translate(191.5px, 65px)',
								zIndex: '6',
							}}
						>
							<MoreModal
								menuTitle={menuTitle}
								teamNumber={0}
								teamTitle=''
								pageType='outsideMyMenu'
								menuId={menuId}
								setIsMoreModalOpen={setIsMoreModalOpen}
							/>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default MyMenuItem;
