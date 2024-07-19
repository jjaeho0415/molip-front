import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const patchModifyTeamMenu = async (
	teamBoardId: number,
	teamName?: string,
	teamMembersNum?: number,
	teamBoardName?: string,
) => {
	const { accessToken } = useAuthStore.getState();
	return await api.patch({
		endpoint: `${apiRoutes.teamBoards}/${teamBoardId}?teamName=${teamName ?? null}&teamMembersNum=${teamMembersNum}&teamBoardName=${teamBoardName ?? null}`,
		authorization: `${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	});
};
