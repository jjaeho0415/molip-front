import React, { useState } from 'react';
import styles from './teamMenuItem.module.css';

interface TeamMenuItemProps {
  menuTitle: string;
  teamTitle?: string;
}

function MenuItem({ menuTitle, teamTitle }: TeamMenuItemProps) {
  const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);

  return <div>MenuItem</div>;
}

export default MenuItem;
