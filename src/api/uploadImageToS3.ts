import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';
import { useAuthStore } from '@/app/login/store/useAuthStore';

export const uploadImageToS3 = async (imageUrl: string): Promise<string> => {
	const { accessToken } = useAuthStore.getState();
	return await api.post({
		endpoint: apiRoutes.uploadImg,
		body: { base64File: imageUrl },
		authorization: `${accessToken ? accessToken : process.env.NEXT_PUBLIC_ACCESS}`,
	});
};
