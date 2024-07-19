'use client';

import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import styles from './input.module.css';
import { useMutation } from '@tanstack/react-query';
import { patchModifyMyMenu } from '@/api/patchModifyMyMenu';
import useHomeStore from '@/app/home/store/useHomeStore';
import { patchModifyTeamMenu } from '@/api/patchModifyTeamMenu';

interface IInputProps {
	placeholder?: string;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
	menuId: number;
}

export default function SmallInput({
	placeholder = '',
	value,
	setValue,
	menuId,
}: IInputProps) {
	const { tab } = useHomeStore();
	const [debounceValue, setDebounceValue] = useState<string>(value);
	const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const { mutate: modifyName } = useMutation({
		mutationFn: ({ menuId, newMenuName }: modifyMenuNameParams) => {
			if (tab === 'my') {
				return patchModifyMyMenu(menuId, newMenuName);
			} else {
				return patchModifyTeamMenu(menuId, newMenuName);
			}
		},
	});

	useEffect(() => {
		setDebounceValue(value);
	}, [value]);

	useEffect(() => {
		const handler = setTimeout(() => {
			if (debounceValue !== '') {
				modifyName({ menuId, newMenuName: debounceValue });
			}
		}, 500);

		return () => {
			clearTimeout(handler);
		};
	}, [debounceValue]);

	return (
		<div className={styles.Container} onClick={(e) => e.stopPropagation}>
			<input
				value={value}
				onChange={(e) => inputChange(e)}
				className={styles.SmallInputSection}
				placeholder={placeholder}
			/>
		</div>
	);
}
