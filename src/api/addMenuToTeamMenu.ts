import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const AddMenuToTeamMenu = async (
	teamBoardId: number,
	body: { menuIds: number[] },
) => {
	const { accessToken } = useAuthStore.getState();
	return await api.post({
		endpoint: `${apiRoutes.teamBoards}/${teamBoardId}/teammenus`,
		body,
		authorization: `${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	});
};
