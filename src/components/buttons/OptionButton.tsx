import styles from './styles/optionButton.module.css';
import Icon from '../../../public/icons/buttons/check.svg';
import Icon_close from '../../../public/icons/close.svg';
import Image from 'next/image';
import { useState } from 'react';

interface IOptionProps {
	//'default': 회색 | 'selected': 주황테두리 | 'checked':주황버튼 체크표시
	state?: 'default' | 'selected' | 'checked';
	children: React.ReactNode;
	option?: boolean; //true:토글 가능
	close?: boolean;
	onClick?: () => void;
}

export default function OptionButton({
	state = 'default',
	children,
	option = true,
	close = false,
	onClick,
}: IOptionProps) {
	const [btnState, setBtnState] = useState<string>(state);

	const handleToggleBtn = () => {
		if (option) setBtnState(btnState === 'default' ? 'selected' : 'default');
		else return;
	};

	return (
		<button
			className={`${styles.Container} ${styles[btnState]} ${option && styles.option}`}
			onClick={handleToggleBtn}
		>
			{children}
			{state === 'checked' && (
				<Image src={Icon} width={20} height={20} alt='checked' />
			)}
			{close && (
				<Image
					className={styles.closeIcon}
					src={Icon_close}
					width={20}
					height={20}
					alt='closeIcon'
					onClick={onClick}
				/>
			)}
		</button>
	);
}
