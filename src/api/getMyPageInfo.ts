import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const getMyPageInfo = async (): Promise<IUserInfo> => {
	const { accessToken } = useAuthStore.getState();
	return await api.get({
		endpoint: `${apiRoutes.myPage}/info`,
		authorization: `${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	});
};
