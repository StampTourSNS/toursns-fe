import { useEffect, useState } from 'react';

import { Cloud, CloudRainWind, CloudSnow, Sun } from 'lucide-react';

import { getWeather } from '@/api/weather';
import StatusChip from '@/components/festivalStatusChip/StatusChip';
import { StatusType } from '@/components/festivalStatusChip/StatusChip';

import styles from './FestivalHeader.module.css';

interface WeatherData {
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
    main: string;
  }>;
}

interface Festival {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  address: string;
  festivalNumber: string;
  image: string;
  active: string;
  nx?: number;
  ny?: number;
}

interface WeatherIconProps {
  weatherMain: string;
}

const WeatherIcon = ({ weatherMain }: WeatherIconProps) => {
  const weatherIcons = {
    Clouds: <Cloud />,
    Rain: <CloudRainWind />,
    Snow: <CloudSnow />,
    Clear: <Sun />,
  };

  return (
    <span>
      {weatherIcons[weatherMain as keyof typeof weatherIcons] || <></>}
    </span>
  );
};

const WeatherDisplay = ({
  weather,
  loading,
  error,
}: {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}) => {
  if (loading) return <div className={styles.weather}>날씨 로딩 중...</div>;
  if (error) return <div className={styles.weather}>{error}</div>;
  if (!weather) return <div className={styles.weather}>날씨 정보 없음</div>;

  return (
    <div className={styles.weather}>
      {`${weather.main.temp.toFixed(1)}°C`}
      <WeatherIcon weatherMain={weather.weather[0]?.main} />
    </div>
  );
};

const useWeatherData = (nx?: number, ny?: number) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!nx || !ny) {
        setError('위치 정보가 없습니다.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const weatherData = await getWeather(nx, ny);
        setWeather(weatherData);
      } catch (error) {
        console.error('날씨 데이터 가져오기 실패:', error);
        setError('날씨 정보를 가져올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [nx, ny]);

  return { weather, loading, error };
};

export default function FestivalHeader({ festival }: { festival: Festival }) {
  const {
    weather,
    loading: weatherLoading,
    error: weatherError,
  } = useWeatherData(festival?.nx, festival?.ny);

  return (
    <div className={styles.festivalInfoHeader}>
      <StatusChip status={festival?.active as StatusType} />
      <WeatherDisplay
        weather={weather}
        loading={weatherLoading}
        error={weatherError}
      />
    </div>
  );
}
