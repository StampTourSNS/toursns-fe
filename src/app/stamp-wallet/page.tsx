'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CountChip from '@/app/stamp-wallet/_components/countChip';
import { ROUTES } from '@/constants/routes';

import StampSummary from './_components/stampSummary';
import styles from './page.module.css';

interface StampData {
  regionId: number;
  stampCount: number;
}

const REGION_COORDINATES = [
  { index: 0, name: '거제시' },
  { index: 1, name: '고성군' },
  { index: 2, name: '거창군' },
  { index: 3, name: '김해시' },
  { index: 4, name: '남해군' },
  { index: 5, name: '밀양시' },
  { index: 6, name: '사천시' },
  { index: 7, name: '산청군' },
  { index: 8, name: '양산시' },
  { index: 9, name: '의령군' },
  { index: 10, name: '진주시' },
  { index: 11, name: '창녕군' },
  { index: 12, name: '창원시' },
  { index: 13, name: '통영시' },
  { index: 14, name: '하동군' },
  { index: 15, name: '함안군' },
  { index: 16, name: '함양군' },
  { index: 17, name: '합천군' },
];

export default function StampWalletPage() {
  const router = useRouter();
  const [data, setData] = useState<StampData[]>([]);
  const totalCount = data.reduce((sum, d) => sum + d.stampCount, 0);

  useEffect(() => {
    setData([
      { regionId: 0, stampCount: 2 },
      { regionId: 1, stampCount: 0 },
      { regionId: 2, stampCount: 3 },
      { regionId: 10, stampCount: 1 },
      { regionId: 12, stampCount: 0 },
    ]);
  }, []);

  return (
    <>
      <StampSummary total={totalCount} />
      <div className={styles.container}>
        {data.map(({ regionId, stampCount }) => {
          const region = REGION_COORDINATES.find((r) => r.index === regionId);
          if (!region) return null;

          return (
            <div key={regionId} className={styles.item}>
              <div
                className={styles.imageBox}
                onClick={() =>
                  router.push(ROUTES.REGION_WALLET(String(regionId)))
                }
                style={{ cursor: 'pointer' }}
              >
                <Image
                  fill
                  src={`/images/stamp/${regionId}.png`}
                  alt={region.name}
                  className={styles.image}
                />
                <div className={styles.chip}>
                  <CountChip stampCount={stampCount} />
                </div>
              </div>
              <div className={styles.name}>{region.name}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
