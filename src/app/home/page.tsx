'use client';

import Header from '@/components/Header';
import styles from './home.module.css';
import TabNavigation from '@/components/TabNavigation';
import { useState } from 'react';
import { myMenuList, teamMenuList } from '@/data/menuList';
import MyMenuItem from '@/components/menuItem/MyMenuItem';
import TeamMenuItem from '@/components/menuItem/TeamMenuItem';
import BottomSheet from '@/components/BottomSheet/BottomSheet';

export default function Home() {
  const [tab, setTab] = useState<'my' | 'team'>('my');

  return (
    <>
      <Header />
      <TabNavigation tab={tab} setTab={setTab} />
      <div className={styles.Container}>
        <div className={styles.createContainer}>
          <p className={styles.titleSection}>
            {tab === 'my' ? '나의 ' : '팀 '}메뉴판
          </p>
        </div>
        {tab === 'my' ? (
          <>
            {myMenuList.map((myMenuItem, index) => (
              <MyMenuItem menuTitle={myMenuItem.menuName} key={index} />
            ))}
          </>
        ) : (
          <>
            {teamMenuList.map((teamMenuItem, index) => (
              <TeamMenuItem
                teamTitle={teamMenuItem.teamName}
                menuTitle={teamMenuItem.menuName}
                key={index}
              />
            ))}
          </>
        )}
      </div>
      <BottomSheet size='small'>
        <span>Content</span>
      </BottomSheet>
    </>
  );
}
