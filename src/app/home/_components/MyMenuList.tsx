import React, { useState } from 'react';
import MyMenuItem from '@/components/menuItem/MyMenuItem';
import { useRouter } from 'next/navigation';
import styles from './styles/menuList.module.css';
import MoreModal from '@/components/modals/MoreModal';

interface MyMenuListProps {
	menuList: IGetMyMenuType[];
}

function MyMenuList({ menuList }: MyMenuListProps) {
	const route = useRouter();
	const [isMoreModalOpen, setIsMoreModalOpen] = useState<number>(-1);

	const handleMenuItemClick = (menuId: number, menuName: string) => {
		route.push(`/menu?menuId=${menuId}&menuName=${menuName}`);
	};

	return (
		<div className={styles.ListContainer}>
			{menuList.map((myMenuItem, index) => (
				<div key={myMenuItem.personalBoardId} className={styles.itemContainer}>
					<MyMenuItem
						menuTitle={myMenuItem.name}
						key={index}
						index={index}
						isMoreModalOpen={isMoreModalOpen}
						setIsMoreModalOpen={setIsMoreModalOpen}
						handleClick={() =>
							handleMenuItemClick(myMenuItem.personalBoardId, myMenuItem.name)
						}
					/>
					{isMoreModalOpen === index && (
						<div
							style={{
								position: 'absolute',
								transform: 'translate(191.5px, -15px)',
								zIndex: '6',
							}}
						>
							<MoreModal
								menuTitle={myMenuItem.name}
								teamNumber={0}
								teamTitle=''
								pageType='outsideMyMenu'
								menuId={myMenuItem.personalBoardId}
								setIsMoreModalOpen={setIsMoreModalOpen}
							/>
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export default MyMenuList;
