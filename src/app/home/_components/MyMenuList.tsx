import React from 'react';
import MyMenuItem from '@/components/menuItem/MyMenuItem';
import { useRouter } from 'next/navigation';

interface MyMenuListProps {
	menuList: {
		menuName: string;
	}[];
}

function MyMenuList({ menuList }: MyMenuListProps) {
	const route = useRouter();

	const handleMenuItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		route.push('/menu');
	};

	return (
		<>
			{menuList.map((myMenuItem, index) => (
				<MyMenuItem
					menuTitle={myMenuItem.menuName}
					key={index}
					handleClick={() => handleMenuItemClick}
				/>
			))}
		</>
	);
}

export default MyMenuList;
