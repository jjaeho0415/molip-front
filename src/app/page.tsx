'use client';

import MenuCardModal from '@/components/modals/MenuCardModal';
import { useState } from 'react';
import Splash from '../components/Splash';
import TopMenuButton from '@/components/buttons/TopMenuButton';
import InputModal from '@/components/modals/InputModal';

export default function Home() {
  const [isMenuCardModalOpen, setIsMenuCardModalOpen] =
    useState<boolean>(false);
  const [isInputModalOpen, setIsInputModalOpen] = useState<boolean>(false);
  return (
    <>
      <Splash />
      <div>
        <button onClick={() => setIsMenuCardModalOpen(true)}>
          메뉴카드 모달
        </button>
        <button onClick={() => setIsInputModalOpen(true)}>입력 모달</button>
        {isMenuCardModalOpen && (
          <MenuCardModal
            menuTitle='감자탕'
            menuImage='/image/감자탕.jpg'
            hashTags={['한식', '매콤함', '국물있는', '밥', '추운날']}
            setIsMenuCardModalOpen={setIsMenuCardModalOpen}
          />
        )}
        {isInputModalOpen && (
          <InputModal setIsInputModalOpen={setIsInputModalOpen} />
        )}
      </div>
      <TopMenuButton />
    </>
  );
}
