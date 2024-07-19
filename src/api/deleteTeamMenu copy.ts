import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const deleteTeamMenu = async (teamBoardId: number) => {
	const { accessToken } = useAuthStore.getState();
	return await api.delete({
		endpoint: `${apiRoutes.teamBoards}/${teamBoardId}`,
		authorization: `${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	});
};
