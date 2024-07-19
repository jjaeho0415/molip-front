import { apiRoutes } from '@/_lib/apiRoutes';
import { fetchData } from '@/_lib/axios';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const postCreateMyMenu = async (
	menuName: string,
): Promise<IGetMyMenuType> => {
	const { accessToken } = useAuthStore.getState();
	return await fetchData(
		'POST',
		`${apiRoutes.porsonalboards}?name=${menuName}`,
		undefined,
		`${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	);
};
