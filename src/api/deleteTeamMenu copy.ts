import { apiRoutes } from '@/_lib/apiRoutes';
import { fetchData } from '@/_lib/axios';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const deleteTeamMenu = async (teamBoardId: number) => {
	const { accessToken } = useAuthStore.getState();
	return await fetchData(
		'POST',
		`${apiRoutes.teamBoards}/teamBoardId=${teamBoardId}`,
		undefined,
		`${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	);
};
