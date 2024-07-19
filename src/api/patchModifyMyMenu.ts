import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const patchModifyMyMenu = async (menuId: number, newMenuName: string) => {
	const { accessToken } = useAuthStore.getState();
	return await api.patch({
		endpoint: `${apiRoutes.porsonalboards}/${menuId}?name=${newMenuName}`,
		authorization: `${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	});
};
