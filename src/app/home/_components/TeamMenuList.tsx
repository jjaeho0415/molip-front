import TeamMenuItem from '@/components/menuItem/TeamMenuItem';
import React from 'react';

interface TeamMenuListProps {
  menuList: {
    teamName: string;
    menuName: string;
    teamNumber: number;
  }[];
}

function TeamMenuList({ menuList }: TeamMenuListProps) {
  return (
    <>
      {menuList.map((teamMenuItem, index) => (
        <TeamMenuItem
          teamTitle={teamMenuItem.teamName}
          menuTitle={teamMenuItem.menuName}
          teamNumber={teamMenuItem.teamNumber}
          key={index}
        />
      ))}
    </>
  );
}

export default TeamMenuList;
