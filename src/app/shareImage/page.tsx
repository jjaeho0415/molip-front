'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ShareImage() {
	const searchParams = useSearchParams();
	const image = searchParams.get('image');
	const [imageSrc, setImageSrc] = useState<string | null>(null);

	useEffect(() => {
		if (image) {
			setImageSrc(image as string);
		}
	}, [image]);

	return <div>{imageSrc && <img src={imageSrc} alt='Shared Image' />}</div>;
}
