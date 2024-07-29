import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const getVoteResult = async (
	teamBoardId: number,
): Promise<IGetVoteList> => {
	const { accessToken } = useAuthStore.getState();
	return await api.get({
		endpoint: `${apiRoutes.votes}/teamboards/${teamBoardId}/votes`,
		authorization: `${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	});
};
