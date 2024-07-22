import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';

export const postGuestRecommend = async (
	selectedOptions:ISelctedOptionsType): Promise<IGetMyCategoryMenuType[]> => {
	return await api.post({
		endpoint: `${apiRoutes.porsonalboards}${apiRoutes.guest}`,
		body: selectedOptions,
	});
};
