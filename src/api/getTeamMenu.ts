import { apiRoutes } from '@/_lib/apiRoutes';
import { fetchData } from '@/_lib/axios';

export const getTeamMenu = async (
	teamBoardId: number,
	token: string,
): Promise<IGetTeamMenuType[]> => {
	return await fetchData(
		'GET',
		`${apiRoutes.teamBoards}/${teamBoardId}`,
		token,
	);
};
