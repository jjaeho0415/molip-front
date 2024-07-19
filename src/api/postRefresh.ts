import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';

export const getAccessToken = async (): Promise<string | null> => {
	try {
		const response: Response = await api.post({ endpoint: apiRoutes.refresh });
		// 응답 헤더에서 'access' 값을 가져옵니다.
		const accessToken = response.headers.get('access');
		return accessToken;
	} catch (error) {
		console.error('Error fetching access token:', error);
		throw error;
	}
};
