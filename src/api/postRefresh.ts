import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';

export const getAccessToken = async () => {
	try {
		console.log('Requesting new access token...');
		const response: Response = await api.post({ endpoint: apiRoutes.refresh });
		console.log('Response Headers:', response.headers);
		console.log('Response Headers access:', response.headers.get('access'));
		const accessToken = response.headers.get('access');
		if (!accessToken) {
			throw new Error('No access token in response');
		}
		console.log('Access Token:', accessToken);
		return accessToken;
	} catch (error) {
		console.error('Error fetching access token:', error);
		throw error;
	}
};
