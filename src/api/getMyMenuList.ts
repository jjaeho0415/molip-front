import { apiRoutes } from '@/_lib/apiRoutes';
import { fetchData } from '@/_lib/axios';

export const getMyMenuList = async (
	token: string,
): Promise<IGetMyMenuType[]> => {
	return await fetchData('GET', apiRoutes.porsonalboards, token);
};
