import { apiRoutes } from '@/_lib/apiRoutes';
import { fetchData } from '@/_lib/axios';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const getTeamMenuList = async (): Promise<IGetTeamMenuType[]> => {
	const { accessToken } = useAuthStore.getState();

	return await fetchData(
		'GET',
		`${apiRoutes.teamBoards}/list`,
		undefined,
		`${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	);
};
