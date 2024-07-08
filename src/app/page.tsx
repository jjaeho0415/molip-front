'use client';

import MenuCardModal from '@/components/modals/MenuCardModal';
import { useState } from 'react';
import TrialViewModal from '@/components/modals/TrialViewModal';
import TopMenuButton from '@/components/buttons/TopMenuButton';
import Splash from '@/components/Splash';
import MoreModal from '@/components/modals/MoreModal';
import Image from 'next/image';
import TopNavBar from '@/components/TopNavBar';

export default function Home() {
  const [isMenuCardModalOpen, setIsMenuCardModalOpen] =
    useState<boolean>(false);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState<boolean>(false);
  const [isMoreModalOpen, setIsMoreModalOpen] = useState<boolean>(false);

  return (
    <>
      <Splash />
      <TopNavBar title='스위프의 메뉴판' />
      <TopNavBar menu={true} />
      <div>
        <button onClick={() => setIsMenuCardModalOpen(true)}>
          메뉴카드 모달
        </button>
        <button onClick={() => setIsTrialModalOpen(true)}>체험판 모달</button>
        <Image
          alt='moreIcon'
          src='/svg/moreIcon.svg'
          width={24}
          height={24}
          onClick={() =>
            isMoreModalOpen
              ? setIsMoreModalOpen(false)
              : setIsMoreModalOpen(true)
          }
          style={{ position: 'relative', cursor: 'pointer' }}
        />
        {isMenuCardModalOpen && (
          <MenuCardModal
            menuTitle='감자탕'
            menuImage='/image/감자탕.jpg'
            hashTags={['한식', '매콤함', '국물있는', '밥', '추운날']}
            setIsMenuCardModalOpen={setIsMenuCardModalOpen}
          />
        )}
        {isTrialModalOpen && (
          <TrialViewModal setIsTrialModalOpen={setIsTrialModalOpen} />
        )}

        {isMoreModalOpen && (
          <>
            <div style={{ position: 'absolute', left: '100px' }}>
              <MoreModal pageType='insideTeamMenu' />
            </div>
          </>
        )}
      </div>
      <TopMenuButton />
      <br />
      <TopMenuButton size='small' />
      <br />
    </>
  );
}
