import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';
import { useAuthStore } from '@/app/login/store/useAuthStore';

interface IGetAddedUserInfo {
	addedMenuUserCount: number;
	teamMembersNum: number;
}

export const getHasMenuAddedMembers = async (
	teamBoardId: number,
): Promise<IGetAddedUserInfo> => {
	const { accessToken } = useAuthStore.getState();
	return await api.get({
		endpoint: `${apiRoutes.teamBoards}/teamboards/${teamBoardId}/countAdded`,
		authorization: `${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	});
};
