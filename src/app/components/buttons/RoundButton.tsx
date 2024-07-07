'use client';

import Image from 'next/image';
import styles from './roundButton.module.css';
import { useEffect, useState } from 'react';
import Icon_option from '../../../../public/icons/buttons/option.svg';
import Icon_check from '../../../../public/icons/buttons/check.svg';

interface IRoundButtonProps {
  property: '새로' | '옵션' | '메뉴' | '메뉴추가완료';
  onClick?: () => void;
}

const props = [
  {
    prop: '새로',
    comment: '+ 새로만들기',
  },
  {
    prop: '옵션',
    comment: '옵션 선택하기',
    src: Icon_option,
  },
  {
    prop: '메뉴',
    comment: '+ 메뉴 추가하기',
  },
  {
    prop: '메뉴추가완료',
    comment: '메뉴 추가 완료',
    src: Icon_check,
  },
];

export default function RoundButton({ property, onClick }: IRoundButtonProps) {
  const [Icon, setIcon] = useState<string>('');
  const [comment, setComment] = useState<string | undefined>('');

  useEffect(() => {
    const matchedProp = props.find((p) => p.prop === property);
    if (matchedProp && matchedProp.src) {
      setIcon(matchedProp.src);
    }
    setComment(matchedProp?.comment);
  }, [property]);

  return (
    <button
      className={`${styles.RoundBtn} ${property === '메뉴추가완료' && styles.complete}`}
      onClick={onClick}
    >
      {Icon && <Image src={Icon} alt='Icon' width={24} height={24} />}
      {comment}
    </button>
  );
}
