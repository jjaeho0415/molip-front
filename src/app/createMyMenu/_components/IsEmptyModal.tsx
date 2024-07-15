'use client';

import React, { Dispatch, SetStateAction } from 'react';
import styles from './isEmptyModal.module.css';
import Image from 'next/image';

interface IsEmptyModal {
	setIsEmpty: Dispatch<SetStateAction<boolean>>;
}

function IsEmptyModal({ setIsEmpty }: IsEmptyModal) {
	return (
		<>
			<div className={styles.modal}>
				<div className={styles.content}>
					<p>메뉴판의 이름을 지어주세요!</p>
					<Image
						src='/svg/XIcon.svg'
						height={16}
						width={16}
						alt='XIcon'
						onClick={() => setIsEmpty(false)}
						style={{ cursor: 'pointer' }}
					/>
				</div>
			</div>
		</>
	);
}

export default IsEmptyModal;
