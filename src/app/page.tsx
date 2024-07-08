'use client';

import MenuCardModal from '@/components/modals/MenuCardModal';
import { useState } from 'react';
import TrialViewModal from '@/components/modals/TrialViewModal';
import TopMenuButton from '@/components/buttons/TopMenuButton';
import Splash from '@/components/Splash';
import OptionButton from '@/components/buttons/OptionButton';

export default function Home() {
  const [isMenuCardModalOpen, setIsMenuCardModalOpen] =
    useState<boolean>(false);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState<boolean>(false);
  return (
    <>
      <Splash />
      <div>
        <button onClick={() => setIsMenuCardModalOpen(true)}>
          메뉴카드 모달
        </button>
        <button onClick={() => setIsTrialModalOpen(true)}>체험판 모달</button>
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
      </div>
      <TopMenuButton />
      <br />
      <OptionButton state='selected' option={false}>
        짜장면
      </OptionButton>
      <OptionButton state='checked' option={false}>
        물냉면
      </OptionButton>
      <OptionButton>짬뽕</OptionButton>
    </>
  );
}
