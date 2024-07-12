import axios, { AxiosError, AxiosResponse } from 'axios';

type ErrorType = {
	message: string;
	status: number;
};

axios.defaults.withCredentials = true;

const customAxios = (() =>
	axios.create({
		baseURL: '/api/v1',
		headers: {
			'Content-Type': 'application/json',
		},
	}))();

export const fetchData = async <ResponseType, RequestType = undefined>(
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
	endpoint: string,
	data?: RequestType,
): Promise<ResponseType> => {
	try {
		let response: AxiosResponse<ResponseType>;
		switch (method) {
			case 'GET':
				response = await customAxios.get(endpoint);
				break;
			case 'POST':
				response = await customAxios.post<ResponseType>(endpoint, data);
				break;
			case 'PUT':
				response = await customAxios.put<ResponseType>(endpoint, data);
				break;
			case 'DELETE':
				response = await customAxios.delete<ResponseType>(endpoint);
				break;
			case 'PATCH':
				response = await customAxios.patch<ResponseType>(endpoint, data);
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
