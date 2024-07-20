import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';

export type IRefreshType = {
	access: string;
	message: string;
};

export const getAccessToken = async (): Promise<IRefreshType> => {
	console.log('Requesting new access token...');
	return await api.post({ endpoint: apiRoutes.refresh });
};
