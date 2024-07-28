'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './shareImage.module.css';

export default function ShareImage() {
	const searchParams = useSearchParams();
	const image = searchParams.get('image');
	const [imageSrc, setImageSrc] = useState<string | null>(null);

	useEffect(() => {
		if (image) {
			setImageSrc(image as string);
		}
	}, [image]);

	return (
		<div>
			{imageSrc && (
				<img className={styles.imageBox} src={imageSrc} alt='Shared Image' />
			)}
		</div>
	);
}
