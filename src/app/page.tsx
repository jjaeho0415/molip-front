'use client';

import Splash from '@/components/Splash';
import KakaoInitializer from '@/utils/KakaoInitializer';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from './login/store/useAuthStore';
import Loading from '@/components/Loading';

export default function App() {
	const route = useRouter();
	const { isLogin } = useAuthStore.getState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (isLogin) {
			route.replace('/home');
		} else {
			setLoading(false);

			const timer = setTimeout(() => {
				route.push('/login');
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [isLogin, route]);

	return (
		<>
			<KakaoInitializer />
			{loading ? (
				<div
					style={{
						display: 'flex',
						height: '100vh',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Loading backgroundColor='white' />
				</div>
			) : (
				<Splash />
			)}
		</>
	);
}
