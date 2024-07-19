import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const postCreateMyMenu = async (
	menuName: string,
): Promise<IGetMyMenuType> => {
	const { accessToken } = useAuthStore.getState();
	return await api.post({
		endpoint: `${apiRoutes.porsonalboards}?name=${menuName}`,
		authorization: `${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	});
};
