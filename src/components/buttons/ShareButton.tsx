'use client';

import Button from './Button';
import Icon_download from '../../../public/icons/buttons/download.svg';
import Icon_disabled from '../../../public/icons/buttons/download_disabled.svg';
import styles from './styles/share.module.css';
import Image from 'next/image';

interface IShareIprops {
	state?: 'default' | 'disabled';
	onClick?: () => void;
	children: React.ReactNode;
}

export default function ShareButton({
	state = 'default',
	onClick,
	children,
}: IShareIprops) {
	return (
		<div className={styles.Container}>
			<Button size='medium' state={state} onClick={onClick}>
				{children}
			</Button>
			<div
				className={`${styles[state]} ${styles.BtnBox}`}
				onClick={() => {
					return;
				}}
			>
				<Image
					src={state === 'default' ? Icon_download : Icon_disabled}
					width={24}
					height={24}
					alt='share'
				/>
			</div>
		</div>
	);
}
