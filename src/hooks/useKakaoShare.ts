import { uploadImageToS3 } from '@/api/uploadImageToS3';
import { constant } from '@/utils/constant';
import html2canvas from 'html2canvas';
import { RefObject, useEffect } from 'react';

interface useKakaoShareProps {
	canvasRef?: RefObject<HTMLDivElement>;
}

const useKakaoShare = ({ canvasRef }: useKakaoShareProps) => {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const { Kakao } = window;

			if (Kakao && !Kakao.isInitialized()) {
				Kakao.init(constant.kakaoKey);
			}
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
			const imageUrl = await uploadImageToS3(dataURL);
			const shareUrl = `${window.location.origin}/shareImage?image=${imageUrl}`;
			Kakao.Share.sendDefault({
				objectType: 'feed',
				content: {
					title: '모입 : 모두의 입맛을 충족해 줄 메뉴판',
					description: '이미지 공유',
					imageUrl: imageUrl,
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
