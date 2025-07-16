'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import festivalData from '../festivalData.json';

import FestivalHeader from './_components/FestivalHeader';
import FestivalInfo from './_components/FestivalInfo';
import Map from './_components/Map';
import styles from './page.module.css';

export default function FestivalDetail() {
  const { id } = useParams<{ id: string }>();
  const festival = festivalData.items.find(
    (festival) => festival.id === Number(id),
  );

  if (!festival) {
    return <div>Festival not found</div>;
  }

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
      </div>
      <div className={styles.recommendFood}>
        <h3>추천 음식점</h3>
        <div>리스트</div>
      </div>
      <div className={styles.recommendTour}>
        <h3>추천 관광지</h3>
        <div>리스트</div>
      </div>
    </div>
  );
}
