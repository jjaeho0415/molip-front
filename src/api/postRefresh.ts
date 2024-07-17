import { apiRoutes } from '@/_lib/apiRoutes';
import { fetchData } from '@/_lib/axios';
import { AxiosResponse } from 'axios';

export const getAccessToken = async () => {
	try {
		const response: AxiosResponse = await fetchData('POST', apiRoutes.refresh);

		const accessToken: string = response.headers['access'];

		if (!accessToken) {
			throw new Error('Access token not found in response headers');
		}

		return accessToken;
	} catch (error) {
		throw new Error(`Failed to fetch access token: ${error}`);
	}
};
