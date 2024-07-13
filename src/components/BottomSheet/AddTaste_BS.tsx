import React, { useState } from 'react';
import styles from './addTaste.module.css';
import Button from '../buttons/Button';

interface AddTaste_BSProps {
	onClick: () => void;
}

function AddTaste_BS({ onClick }: AddTaste_BSProps) {
	const [isAllTasteClicked, setIsAllTasteClicked] = useState<boolean>(false);

	const handleSave = (): void => {
		isAllTasteClicked && onClick;
	};
	return (
		<>
			<div className={styles.container}></div>
			<div className={styles.buttonBox}>
				<Button
					state={!isAllTasteClicked ? 'disabled' : 'default'}
					onClick={handleSave}
				>
					적용하기
				</Button>
				<p className={styles.reset}>초기화</p>
			</div>
		</>
	);
}

export default AddTaste_BS;
