'use client';

import Button from '@/components/buttons/Button';
import MenuCardModal from '@/components/modals/MenuCardModal';
import ShareButton from './components/buttons/ShareButton';
import { useState } from 'react';
import Splash from './components/Splash';
import TrialViewModal from '@/components/modals/TrialViewModal';

export default function Home() {
  const [isMenuCardModalOpen, setIsMenuCardModalOpen] =
    useState<boolean>(false);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState<boolean>(false);
  return (
    <>
      <Splash />
      <div>
        <Button>적용하기</Button>
        <br />
        <br />
        <Button state='disabled'>적용하기</Button>
        <br />
        <br />
        <Button size='small'>적용하기</Button>
      </div>
      <div>
        <ShareButton></ShareButton>

        <ShareButton state='disabled'></ShareButton>
      </div>
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
    </>
  );
}
