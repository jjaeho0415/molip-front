'use client';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { constant } from '@/utils/constant'; // 경로는 실제 위치에 맞게 조정하세요

const useAuthRedirect = () => {
	const { isLogin } = useAuthStore(); // 상태 값을 직접 가져옵니다.
	const route = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (!isLogin && constant.protectedRoute.includes(pathname)) {
			route.replace('/login');
		}
	}, [isLogin, pathname, route]);

	return null; // 비로그인 상태일 때 페이지 로딩을 방지
};

export default useAuthRedirect;
