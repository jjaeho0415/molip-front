import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const getMyMenuList = async ():Promise<IGetMyMenuType[]> => {
	const { accessToken } = useAuthStore.getState();
	return await api.get({
		endpoint: apiRoutes.porsonalboards,
		authorization: `${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	});
};
