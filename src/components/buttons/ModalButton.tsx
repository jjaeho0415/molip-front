import React from 'react';
import styles from './styles/modalButton.module.css';

interface ModalButtonProps {
	handleClick: () => void;
	buttonText: string;
	color: 'gray' | 'orange' | 'disabled';
	cursor?: boolean;
}

function ModalButton({
	handleClick,
	buttonText,
	color,
	cursor = true,
}: ModalButtonProps) {
	return (
		<button
			onClick={(e) => {
				e.stopPropagation();
				handleClick();
			}}
			className={`${styles.closeButton} ${styles[color]} ${cursor && styles.cursor}`}
		>
			{buttonText}
		</button>
	);
}

export default ModalButton;
