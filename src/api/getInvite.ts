import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const getInvite = async (teamBoardId: string): Promise<IGetInvite> => {
	const { accessToken } = useAuthStore.getState();
	return await api.get({
		endpoint: `${apiRoutes.invite}/${teamBoardId}`,
		authorization: `${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	});
};
