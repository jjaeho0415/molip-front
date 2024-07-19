import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const getTeamMenuItem = async (
	teamBoardId: number,
): Promise<IGetTeamMenuType> => {
	const { accessToken } = useAuthStore.getState();

	return await api.get({
		endpoint: `${apiRoutes.teamBoards}/${teamBoardId}`,
		authorization: `${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	});
};
