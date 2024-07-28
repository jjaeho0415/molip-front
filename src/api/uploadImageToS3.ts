import { apiRoutes } from '@/_lib/apiRoutes';
import api from '@/_lib/fetcher';

export const uploadImageToS3 = async (imageUrl: string): Promise<string> => {
	return await api.post({
		endpoint: apiRoutes.uploadImg,
		body: { base64File: imageUrl },
	});
};
