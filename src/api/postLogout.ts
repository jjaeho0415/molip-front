import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';

export const postLogout = async () => {
	return await api.post({ endpoint: apiRoutes.logout });
};
