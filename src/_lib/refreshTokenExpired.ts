'use client';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useRouter } from 'next/navigation';

const RefreshTokenExpired = () => {
	const router = useRouter();
	useAuthStore.setState({ isLogin: false, accessToken: null });
	localStorage.clear();
	router.push('/');
};

export default RefreshTokenExpired;
