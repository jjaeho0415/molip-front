import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const postCreateTeamMenu = async (
	teamName: string,
	teamMembersNum: number,
	teamBoardName: string,
) => {
	const { accessToken } = useAuthStore.getState();
	return await api.post({
		endpoint: `${apiRoutes.teamBoards}?teamName=${teamName}&teamMembersNum=${teamMembersNum}&teamBoardName=${teamBoardName}`,
		authorization: `${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	});
};
