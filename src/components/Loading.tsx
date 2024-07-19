import React from 'react';
import styles from './loading.module.css';
import Image from 'next/image';

interface LoadingProps {
	backgroundColor: 'white' | 'orange';
}

function Loading({ backgroundColor }: LoadingProps) {
	return (
		<div className={styles.spinner}>
			<Image
				alt='loadingSpinner'
				height={24}
				width={24}
				src={
					backgroundColor === 'orange'
						? '/svg/orangeBackgroundLoading.svg'
						: '/svg/whiteBackgroundLoading.svg'
				}
				priority
			/>
		</div>
	);
}

export default Loading;
