import React from 'react';
import MyMenuItem from '@/components/menuItem/MyMenuItem';
import { useRouter } from 'next/navigation';
import styles from './styles/menuList.module.css';

interface MyMenuListProps {
	menuList: IGetMyMenuType[];
}

function MyMenuList({ menuList }: MyMenuListProps) {
	const route = useRouter();

	const handleMenuItemClick = () => {
		route.push('/menu');
	};

	return (
		<div className={styles.ListContainer}>
			{menuList.map((myMenuItem, index) => (
				<MyMenuItem
					menuTitle={myMenuItem.name}
					key={index}
					handleClick={handleMenuItemClick}
				/>
			))}
		</div>
	);
}

export default MyMenuList;
