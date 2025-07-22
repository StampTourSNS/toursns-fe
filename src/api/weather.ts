import axios from 'axios';

export const getWeather = async (latitude: number, longitude: number) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_WEATHER_API}&lat=${latitude}&lon=${longitude}&units=metric&lang=kr`,
  );
  return response.data;
};
