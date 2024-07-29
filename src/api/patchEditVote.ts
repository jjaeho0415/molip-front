import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const patchEditVote = async (teamBoardId: number, body: number[]) => {
	const { accessToken } = useAuthStore.getState();
	return await api.patch({
		endpoint: `${apiRoutes.votes}?teamBoardId=${teamBoardId}`,
		body,
		authorization: `${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	});
};
