//import { useAuthStore } from '@/app/login/store/useAuthStore';
import axios, { AxiosError, AxiosResponse } from 'axios';
//import { apiRoutes } from './apiRoutes';

type ErrorType = {
	message: string;
	status: number;
};

// const refreshAxios = axios.create({
//    baseURL: `${process.env.NEXT_PUBLIC_API}${apiRoutes.refresh}`,
//    withCredentials: true,
//    timeout: 5000,
// });

const customAxios = (() =>
	axios.create({
		baseURL: `${process.env.NEXT_PUBLIC_API}`,
		withCredentials: true,
		headers: {
			'Content-Type': 'application/json',
		},
	}))();

export const fetchData = async <ResponseType, RequestType = undefined>(
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
	endpoint: string,
	data?: RequestType,
	token?: string,
): Promise<ResponseType> => {
	try {
		let response: AxiosResponse<ResponseType>;
		switch (method) {
			case 'GET':
				response = await customAxios.get(endpoint, {
					headers: { access: token },
				});
				break;
			case 'POST':
				response = await customAxios.post<ResponseType>(endpoint, data, {
					headers: { access: token },
				});
				break;
			case 'PUT':
				response = await customAxios.put<ResponseType>(endpoint, data, {
					headers: { access: token },
				});
				break;
			case 'DELETE':
				response = await customAxios.delete<ResponseType>(endpoint, {
					headers: { access: token },
				});
				break;
			case 'PATCH':
				response = await customAxios.patch<ResponseType>(endpoint, data, {
					headers: { access: token },
				});
				break;
			default:
				throw new Error('Invalid HTTP method');
		}
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<ErrorType>;
			if (axiosError.response) {
				// 서버에서 에러 응답이 있는 경우
				const { status, data } = axiosError.response;
				throw new Error(
					`Request failed with status ${status}. Message: ${data.message}`,
				);
			} else {
				// 서버에서 응답을 받지 못한 경우
				throw new Error('Request failed. No response from server.');
			}
		} else {
			// axios 에러가 아닌 경우 (네트워크 문제 등)
			throw new Error('Network error. Please check your internet connection.');
		}
	}
};

// refreshToken으로 accessToken 갱신하기
// customAxios.interceptors.response.use(
//    (response) => response,
//    async (error) => {
//       const originalRequest = error.config;
//       if (error.response.status === 401 || error.response.status === 400) {
//          try {
//             const response = await refreshAxios.post('');
//             const { isLogin } = useAuthStore.getState();
//             const newAccessToken = response.headers['access'];
//             useAuthStore.setState({
//                isLogin: isLogin,
//                accessToken: newAccessToken,
//             });
//             originalRequest.headers.access = `${newAccessToken}`;
//             return customAxios(originalRequest);
//          } catch (refreshError) {
//             console.error('Failed to refresh access token: ', refreshError);
//          }
//       } else {
//          console.error('Refresh token not found.');
//       }
//    },
// );
