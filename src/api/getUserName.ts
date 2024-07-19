import { apiRoutes } from '@/_lib/apiRoutes';
import { fetchData } from '@/_lib/axios';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const getUserName = async (): Promise<IGetUserNameType> => {
	const { accessToken } = useAuthStore.getState();
	return await fetchData(
		'GET',
		apiRoutes.userName,
		undefined,
		`${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	);
};
