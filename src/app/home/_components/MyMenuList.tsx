import React from 'react';
import MyMenuItem from '@/components/menuItem/MyMenuItem';
import { useRouter } from 'next/navigation';
import styles from './styles/menuList.module.css';

interface MyMenuListProps {
	menuList: IGetMyMenuType[];
}

function MyMenuList({ menuList }: MyMenuListProps) {
	const route = useRouter();

	const handleMenuItemClick = (menuId: number, menuName: string) => {
		route.push(`/menu?menuId=${menuId}&menuName=${menuName}`);
	};

	return (
		<div className={styles.ListContainer}>
			{menuList.map((myMenuItem, index) => (
				<MyMenuItem
					menuTitle={myMenuItem.name}
					menuId={myMenuItem.personalBoardId}
					key={index}
					handleClick={() =>
						handleMenuItemClick(myMenuItem.personalBoardId, myMenuItem.name)
					}
				/>
			))}
		</div>
	);
}

export default MyMenuList;
