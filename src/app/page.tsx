'use client';

import Banner from './_components/banner';
import Map from './_components/Map';
import styles from './page.module.css';

// 축제 데이터 상수 정의
const FESTIVAL_DATA = {
  ACTIVE: [
    { festivalRegion: '0' }, // 거제시
    { festivalRegion: '1' }, // 거창군
    { festivalRegion: '2' }, // 고성군
  ],
  SOON: [
    { festivalRegion: '3' }, // 김해시
  ],
};

const HOT_FESTIVAL_DATA = {
  HOT_FESTIVAL: [
    {
      id: '1',
      name: '거제시 거제대학로 축제',
      image: 'https://picsum.photos/200/300',
      address: '경상남도 거제시 거제대학로 123',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
    },
    {
      id: '2',
      name: '거창군 거창대학로 축제',
      image: 'https://picsum.photos/200/300',
      address: '경상남도 거창군 거창대학로 123',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
    },
    {
      id: '3',
      name: '고성군 고성대학로 축제',
      image: 'https://picsum.photos/200/300',
      address: '경상남도 고성군 고성대학로 123',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
    },
  ],
};

export default function Home() {
  return (
    <>
      <div className={styles.hot_festival_container}>
        <h1>🔥 Hot Festival Top 3 🔥</h1>
        <Banner hotFestival={HOT_FESTIVAL_DATA.HOT_FESTIVAL} />
      </div>
      <div className={styles.map_container}>
        <div className={styles.festival_container}>
          <div className={styles.festival_item}>
            <div className={styles.festival_item_icon_active} />
            <p className={styles.festival_item_text}> 진행중인 축제</p>
          </div>
          <div className={styles.festival_item}>
            <div className={styles.festival_item_icon_soon} />
            <p className={styles.festival_item_text}> 예정된 축제</p>
          </div>
        </div>
        <Map
          isActiveFestival={FESTIVAL_DATA.ACTIVE}
          soonActiveFestival={FESTIVAL_DATA.SOON}
        />
      </div>
    </>
  );
}
