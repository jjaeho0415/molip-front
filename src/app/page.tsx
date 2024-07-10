'use client';

import Splash from '@/components/Splash';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
	const route = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			route.push('/login');
		}, 3000);
		return () => clearTimeout(timer);
	}, [route]);

	return (
		<>
			<Splash />
		</>
	);
}
