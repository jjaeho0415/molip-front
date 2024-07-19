import { apiRoutes } from '@/_lib/apiRoutes';
import { fetchData } from '@/_lib/axios';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const getTeamMenu = async (
	teamBoardId: number,
): Promise<IGetTeamMenuType[]> => {
	const { accessToken } = useAuthStore.getState();

	return await fetchData(
		'GET',
		`${apiRoutes.teamBoards}/${teamBoardId}`,
		undefined,
		`${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	);
};
