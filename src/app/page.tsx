'use client';

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

export default function Home() {
  return (
    <>
      <div className={styles.banner_container}>
        <p>배너</p>
      </div>
      <Map
        isActiveFestival={FESTIVAL_DATA.ACTIVE}
        soonActiveFestival={FESTIVAL_DATA.SOON}
      />
    </>
  );
}
