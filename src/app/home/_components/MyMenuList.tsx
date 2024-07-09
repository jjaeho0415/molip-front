import React from 'react';
import MyMenuItem from '@/components/menuItem/MyMenuItem';

interface MyMenuListProps {
  menuList: {
    menuName: string;
  }[];
}

function MyMenuList({ menuList }: MyMenuListProps) {
  return (
    <>
      {menuList.map((myMenuItem, index) => (
        <MyMenuItem menuTitle={myMenuItem.menuName} key={index} />
      ))}
    </>
  );
}

export default MyMenuList;
