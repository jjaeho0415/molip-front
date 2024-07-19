import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const deleteMyMenu = async (menuId: number) => {
	const { accessToken } = useAuthStore.getState();
	return await api.delete({
		endpoint: `${apiRoutes.porsonalboards}/${menuId}`,
		authorization: `${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	});
};
