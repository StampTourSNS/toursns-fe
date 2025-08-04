import axiosInstance from './axiosInstance';

export interface MyItemResponse {
  status: number;
  message: string;
  data: {
    itemId: number;
    itemName: string;
    quantity: number;
    imageUrl: string;
  }[];
}
export const getMyItem = async (): Promise<MyItemResponse> => {
  const response = await axiosInstance.get('/festival/store/my-item');
  return response.data;
};
