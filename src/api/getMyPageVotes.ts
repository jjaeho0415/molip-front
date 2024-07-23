import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const getMyPageVotes = async ():Promise<IUserVotes[]> => {
	const { accessToken } = useAuthStore.getState();
	return await api.get({
		endpoint: `${apiRoutes.myPage}/votes`,
		authorization: `${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	});
};
