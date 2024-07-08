import React, { useState } from 'react'

interface MenuItemProps{
    menuTitle: string;
    menuType: 'my' | 'team';
    teamTitle?: string;
}

function MenuItem({ menuTitle, menuType, teamTitle }: MenuItemProps) {
    const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);
    
  return (
    <div>MenuItem</div>
  )
}

export default MenuItem