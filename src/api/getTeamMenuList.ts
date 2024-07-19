import { apiRoutes } from '@/_lib/apiRoutes';
import { fetchData } from '@/_lib/axios';

export const getTeamMenuList = async (
	token: string,
): Promise<IGetTeamMenuType[]> => {
	return await fetchData('GET', `${apiRoutes.teamBoards}/list`, token);
};
