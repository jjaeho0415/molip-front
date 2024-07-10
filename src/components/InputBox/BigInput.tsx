'use client';

import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import styles from './input.module.css';

interface IInputProps {
	placeholder?: string;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
}

export default function BigInput({
	placeholder = '',
	value,
	setValue,
}: IInputProps) {
	const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return (
		<div className={styles.Container}>
			<input
				value={value}
				onChange={(e) => inputChange(e)}
				className={styles.BigInputSection}
				placeholder={placeholder}
			/>
		</div>
	);
}
