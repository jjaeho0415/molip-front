import axios, { AxiosResponse } from 'axios';

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
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        'An unknown error occurred',
    );
  }
};
