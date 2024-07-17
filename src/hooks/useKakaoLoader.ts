import { constant } from '@/utils/constant';
import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

export default function useKakaoLoader() {
	useKakaoLoaderOrigin({
		appkey: constant.kakaoKey,
		libraries: ['clusterer', 'drawing', 'services'],
	});
}
