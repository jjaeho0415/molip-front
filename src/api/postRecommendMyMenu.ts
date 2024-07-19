import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { IPostRecommend } from '@/components/BottomSheet/AddTaste_BS';

export const postRecommendMyMenu = async ({
	menuId,
	selectedOptions,
}: IPostRecommend) => {
	const { accessToken } = useAuthStore.getState();
	return await api.post({
		endpoint: `${apiRoutes.porsonalboards}/${menuId}/recommend`,
		authorization: `${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
		body: selectedOptions,
	});
};
