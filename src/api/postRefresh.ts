import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';

export const getAccessToken = async () => {
	try {
		const response: Response = await api.post({ endpoint: apiRoutes.refresh });
		const accessToken = response.headers.get('access');
		if (accessToken === null) {
			console.error('Access token not found in the response headers');
    		throw new Error('Access token not found');
		}
		console.log(accessToken)
		return accessToken
	} catch (error) {
		console.error('Error fetching access token:', error);
		throw error;
	}
};
