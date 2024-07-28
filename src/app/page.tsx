'use client';

import Splash from '@/components/Splash';
import KakaoInitializer from '@/utils/KakaoInitializer';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from './login/store/useAuthStore';

export default function Home() {
	const route = useRouter();
	const { isLogin } = useAuthStore.getState();

	useEffect(() => {
		const timer = setTimeout(() => {
			route.push('/login');
		}, 2000);
		return () => clearTimeout(timer);
	}, [route]);

	return (
		<>
			<KakaoInitializer />
			{}
			<Splash />
		</>
	);
}
