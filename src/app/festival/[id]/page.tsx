'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import { Copy } from 'lucide-react';

import StatusChip from '@/components/festivalStatusChip/StatusChip';
import { StatusType } from '@/components/festivalStatusChip/StatusChip';

import festivalData from '../festivalData.json';

import styles from './page.module.css';

export default function FestivalDetail() {
  const { id } = useParams();
  const festival = festivalData.items.find((festival) => festival.id === id);

  if (!festival) {
    return <div>Festival not found</div>;
  }

  const handleClick = () => {
    navigator.clipboard.writeText(festival?.address);
  };

  return (
    <div className={styles.container}>
      <div className={styles.festivalInfo}>
        <Image
          src={festival?.image}
          alt={festival?.name}
          width={200}
          height={230}
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.festivalInfoContent}>
          <div className={styles.festivalInfoHeader}>
            <StatusChip status={festival?.active as StatusType} />
            <div className={styles.weather}>날씨</div>
          </div>
          <h3 className={styles.festivalName}>{festival?.name}</h3>
          <p className={styles.festivalDate}>
            {festival?.startDate} ~ {festival?.endDate}
          </p>
          <div
            className={styles.festivalAddressContainer}
            onClick={handleClick}
          >
            <p className={styles.festivalAddress}>{festival?.address}</p>
            <Copy />
          </div>
          <p className={styles.festivalNumber}>☎️ {festival?.festivalNumber}</p>
          <button className={styles.snsButton}>SNS 구경하기</button>
        </div>
      </div>
      <div className={styles.map}>
        <div>지도</div>
      </div>
      <div className={styles.recommendFood}>
        <div>추천 음식점</div>
        <div>리스트</div>
      </div>
      <div className={styles.recommendTour}>
        <div>추천 관광지</div>
        <div>리스트</div>
      </div>
    </div>
  );
}
