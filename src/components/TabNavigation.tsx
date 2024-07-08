'use client';

import styles from './tabNav.module.css';
import { useRouter } from 'next/navigation';

interface ITabProps {
  tab: 'my' | 'team';
}

export default function TabNavigation({ tab }: ITabProps) {
  const router = useRouter();
  return (
    <div className={styles.TabContainer}>
      <p
        className={tab === 'my' ? styles.active : styles.inactive}
        onClick={() => router.push('/myMenuBoard')}
      >
        나의 메뉴판
      </p>
      <p
        className={tab === 'team' ? styles.active : styles.inactive}
        onClick={() => router.push('/teamMenuBoard')}
      >
        팀 메뉴판
      </p>
    </div>
  );
}
