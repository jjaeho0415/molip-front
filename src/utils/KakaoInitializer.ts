'use client';

import { useEffect } from 'react';
import { constant } from '@/utils/constant';

const KakaoInitializer = () => {
	useEffect(() => {
		const initializeKakao = () => {
			if (window.Kakao && !window.Kakao.isInitialized()) {
				window.Kakao.init(constant.kakaoKey);
			}
		};

		// Kakao SDK가 이미 로드되었는지 확인
		if (document.readyState === 'complete') {
			initializeKakao();
		} else {
			window.addEventListener('load', initializeKakao);
			return () => window.removeEventListener('load', initializeKakao);
		}
	}, []);

	return null;
};

export default KakaoInitializer;
