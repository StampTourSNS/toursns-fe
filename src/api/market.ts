import axiosInstance from './axiosInstance';

export interface MarketItem {
  status: number;
  message: string;
  data: {
    itemId: number;
    itemName: string;
    price: number;
    content: string;
    imageUrl: string;
  }[];
}

export const getMarketItem = async (): Promise<MarketItem> => {
  const response = await axiosInstance.get('/festival/store');
  return response.data;
};
