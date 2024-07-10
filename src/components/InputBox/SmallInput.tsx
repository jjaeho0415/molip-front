'use client';

import { ChangeEvent, useState } from 'react';
import styles from './input.module.css';

interface IInputProps {
	placeholder?: string;
}

export default function SmallInput({ placeholder = '' }: IInputProps) {
	const [value, setValue] = useState<string>('');

	const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return (
		<div className={styles.Container}>
			<input
				value={value}
				onChange={(e) => inputChange(e)}
				className={styles.SmallInputSection}
				placeholder={placeholder}
			/>
		</div>
	);
}
