'use client';

import Image from 'next/image';
import styles from './styles/roundButton.module.css';
import { useEffect, useState } from 'react';
import Icon_option from '../../../public/icons/buttons/option.svg';
import Icon_check from '../../../public/icons/buttons/check.svg';
import Icon_refresh from '../../../public/icons/buttons/Icon_refresh.svg';

interface IRoundButtonProps {
	property: '새로' | '옵션' | '메뉴' | '메뉴추가완료' | '새로고침';
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
	{
		prop: '새로고침',
		comment: '새로고침',
		src: Icon_refresh,
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
			className={`${styles.RoundBtn} ${property === '메뉴추가완료' && styles.complete} ${property === '새로고침' && styles.refresh}`}
			onClick={onClick}
		>
			{Icon && <Image src={Icon} alt='Icon' width={24} height={24} />}
			{comment}
		</button>
	);
}
