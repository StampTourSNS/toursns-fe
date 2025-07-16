'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import festivalData from '../festivalData.json';

import FestivalHeader from './_components/FestivalHeader';
import FestivalInfo from './_components/FestivalInfo';
import Food from './_components/Food';
import Map from './_components/Map';
import Tour from './_components/Tour';
import styles from './page.module.css';

export default function FestivalDetail() {
  const { id } = useParams<{ id: string }>();
  const festival = festivalData.items.find(
    (festival) => festival.id === Number(id),
  );

  if (!festival) {
    return <div>Festival not found</div>;
  }

  const handleMapLinkClick = () => {
    window.open(
      `https://map.kakao.com/link/to/${festival?.name},${festival?.nx},${festival?.ny}`,
      '_blank',
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.festivalInfo}>
        <Image
          src={festival?.image}
          alt={festival?.name}
          width={200}
          height={230}
          className={styles.festivalImage}
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.festivalInfoContent}>
          <FestivalHeader festival={festival} />
          <FestivalInfo festival={festival} />
        </div>
      </div>
      <div className={styles.map}>
        <Map
          mapx={festival?.nx?.toString() || '0'}
          mapy={festival?.ny?.toString() || '0'}
          address={festival?.address}
          telNumber={festival?.festivalNumber}
          name={festival?.name}
        />
        <button className={styles.mapLink} onClick={handleMapLinkClick}>
          길찾기
        </button>
      </div>
      <div className={styles.recommendFood}>
        <h3>추천 음식점</h3>
        <Food foodList={festival?.recommendFood} />
      </div>
      <div className={styles.recommendTour}>
        <h3>추천 관광지</h3>
        <Tour tourList={festival?.recommendTour} />
      </div>
    </div>
  );
}
