import axios from 'axios';

// import axiosInstance from './axiosInstance';

export const snsLogin = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_KAKAO_LOGIN}`, {
    withCredentials: true,
  });
  console.log(response);
  // window.location.href = `${process.env.NEXT_PUBLIC_KAKAO_LOGIN}`;
  return response.data;
};
