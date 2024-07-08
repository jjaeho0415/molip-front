'use client';

import { Dispatch, SetStateAction } from 'react';
import styles from './tabNav.module.css';

interface ITabProps {
  tab: 'my' | 'team';
  setTab: Dispatch<SetStateAction<'my' | 'team'>>;
}

export default function TabNavigation({ tab, setTab }: ITabProps) {
  return (
    <div className={styles.TabContainer}>
      <p
        className={tab === 'my' ? styles.active : styles.inactive}
        onClick={() => setTab('my')}
      >
        나의 메뉴판
      </p>
      <p
        className={tab === 'team' ? styles.active : styles.inactive}
        onClick={() => setTab('team')}
      >
        팀 메뉴판
      </p>
    </div>
  );
}
