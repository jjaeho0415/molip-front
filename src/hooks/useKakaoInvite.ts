import { constant } from '@/utils/constant';
import { useEffect } from 'react';

export const useKakaoInvite = (url: string) => {
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

	const handleKakaoInvite = async () => {
		if (typeof window === 'undefined') {
			console.error('Window is undefined');
			return;
		}
		const { Kakao } = window;
		if (!Kakao || !Kakao.Share || !Kakao.Share.sendDefault) {
			console.error('Kakao Share API is not available');
			return;
		}
		const shareUrl = url;
		Kakao.Share.sendDefault({
			objectType: 'feed',
			content: {
				title: '모입 : 모두의 입맛을 충족해 줄 메뉴판',
				description: '팀 메뉴판 초대',
				imageUrl:
					'https://raw.githubusercontent.com/Swyp-team10/molip-front/dev/public/image/openGraphImg.png?timestamp=' +
					new Date().getTime(),
				link: {
					mobileWebUrl: shareUrl,
					webUrl: shareUrl,
				},
			},
			buttons: [
				{
					title: '웹으로 보기',
					link: {
						mobileWebUrl: shareUrl,
						webUrl: shareUrl,
					},
				},
			],
		});
	};
	return { handleKakaoInvite };
};
