import { apiRoutes } from '@/_lib/apiRoutes';
import { fetchData } from '@/_lib/axios';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const getMyMenuList = async ():Promise<IGetMyMenuType[]> => {
	const { accessToken } = useAuthStore.getState();
	return await fetchData(
		'GET',
		apiRoutes.porsonalboards,
		`${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	);
};
