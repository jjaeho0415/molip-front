import { apiRoutes } from '@/_lib/apiRoutes';
import { fetchData } from '@/_lib/axios';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const postCreateMyMenu = async (menuName: string) => {
	const { accessToken } = useAuthStore.getState();
	return await fetchData(
		'POST',
		`${apiRoutes.porsonalboards}?name=${menuName}`,
		accessToken,
	);
};
