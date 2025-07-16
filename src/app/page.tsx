'use client';

import { useState } from 'react';

import Link from 'next/link';

import { AlignJustify, Search, Trophy } from 'lucide-react';

import { ROUTES } from '@/constants/routes';

import Banner from './_components/Banner';
import Map from './_components/Map';
import styles from './page.module.css';

// 축제 데이터 상수 정의
const FESTIVAL_DATA = {
  FESTIVAL: [
    {
      id: '0',
      name: '거제시 거제대학로 축제',
      image: 'https://picsum.photos/200/300',
      address: '경상남도 거제시 거제대학로 123',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
      festivalRegion: '0',
      active: 'ACTIVE',
    },
    {
      id: '1',
      name: '거창군 거창대학로 축제',
      image: 'https://picsum.photos/200/300',
      address: '경상남도 거창군 거창대학로 123',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
      festivalRegion: '1',
      active: 'ACTIVE',
    },
    {
      id: '2',
      name: '고성군 고성대학로 축제',
      image: 'https://picsum.photos/200/300',
      address: '경상남도 고성군 고성대학로 123',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
      festivalRegion: '2',
      active: 'ACTIVE',
    },
    {
      id: '3',
      name: '김해시 김해대학로 축제',
      image: 'https://picsum.photos/200/300',
      address: '경상남도 김해시 김해대학로 123',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
      festivalRegion: '3',
      active: 'SOON',
    },
    {
      id: '4',
      name: '거제시 축제',
      image: 'https://picsum.photos/200/300',
      address: '경상남도 거제시 거제대학로 12345',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
      festivalRegion: '0',
      active: 'ACTIVE',
    },
  ],
};

const HOT_FESTIVAL_DATA = {
  HOT_FESTIVAL: [
    {
      id: '0',
      name: '거제시 거제대학로 축제',
      image: 'https://picsum.photos/200/300',
      address: '경상남도 거제시 거제대학로 123',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
    },
    {
      id: '1',
      name: '거창군 거창대학로 축제',
      image: 'https://picsum.photos/200/300',
      address: '경상남도 거창군 거창대학로 123',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
    },
    {
      id: '2',
      name: '고성군 고성대학로 축제',
      image: 'https://picsum.photos/200/300',
      address: '경상남도 고성군 고성대학로 123',
      startDate: '2025-01-01',
      endDate: '2025-01-01',
    },
  ],
};

export default function Home() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
        <Map Festival={FESTIVAL_DATA.FESTIVAL} />
      </div>
      <div className={styles.filter_container}>
        <div
          className={styles.filter_icon_large}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <AlignJustify size={36} color="#ff6f61" />
        </div>
        {isFilterOpen && (
          <>
            <div
              className={`${styles.filter_icon_search} ${styles.filter_icon_style}`}
            >
              <Link href={ROUTES.SEARCH}>
                <Search size={28} color="#ff6f61" />
              </Link>
              <div className={styles.filter_tooltip}>검색</div>
            </div>
            <div
              className={`${styles.filter_icon_trophy} ${styles.filter_icon_style}`}
            >
              <Link href={ROUTES.STAMP_RANK}>
                <Trophy size={28} color="#ff6f61" />
              </Link>
              <div className={styles.filter_tooltip}>스탬프 랭킹</div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
