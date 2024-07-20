import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';
import { useAuthStore } from '@/app/login/store/useAuthStore';

interface IModifyBodyProps {
	teamName?: string;
	teamMembersNum?: number;
	teamBoardName?: string;
}

export const patchModifyTeamMenu = async (
	teamBoardId: number,
	body: IModifyBodyProps,
) => {
	const { accessToken } = useAuthStore.getState();
	return await api.patch({
		endpoint: `${apiRoutes.teamBoards}/${teamBoardId}`,
		body,
		authorization: `${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	});
};
