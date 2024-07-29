import { uploadImageToS3 } from '@/api/uploadImageToS3';
import { constant } from '@/utils/constant';
import html2canvas from 'html2canvas';
import { RefObject, useEffect } from 'react';

interface useKakaoShareProps {
	canvasRef?: RefObject<HTMLDivElement>;
}

const useKakaoShare = ({ canvasRef }: useKakaoShareProps) => {
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

	const handleDownImage = async (): Promise<string | undefined> => {
		if (!canvasRef?.current) {
			console.log('Canvas element not found');
			return;
		}
		try {
			const div = canvasRef.current;
			const canvas = await html2canvas(div, { scale: 2 });
			const dataURL = canvas.toDataURL('image/png');
			const base64String = dataURL.split(',')[1];
			return base64String;
		} catch (error) {
			alert('이미지 저장에 실패하였습니다.');
			console.error('Error converting div to image: ', error);
		}
	};

	const handleShare = async () => {
		if (typeof window === 'undefined') {
			console.error('Window is undefined');
			return;
		}
		const { Kakao } = window;
		if (!Kakao || !Kakao.Share || !Kakao.Share.sendDefault) {
			console.error('Kakao Share API is not available');
			return;
		}

		try {
			const dataURL = await handleDownImage();
			if (!dataURL) {
				alert('Failed to generate the image');
				return;
			}
			const response = await uploadImageToS3(dataURL);
			const imageUrl = response.s3ImageUrl;
			console.log(imageUrl);
			const shareUrl = `${window.location.origin}/shareImage?image=${imageUrl}`;
			Kakao.Share.sendDefault({
				objectType: 'feed',
				content: {
					title: '오늘, 당신의 입맛은 어떤가요?',
					description: '모입 : 모두의 입맛을 충족해줄 메뉴판',
					imageUrl: `${imageUrl}?timestamp=` + new Date().getTime(),
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
		} catch (error) {
			alert('Failed to share the image.');
			console.error('Error during share process:', error);
		}
	};

	return { handleShare };
};

export default useKakaoShare;
