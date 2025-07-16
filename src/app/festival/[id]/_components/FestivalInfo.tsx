import Link from 'next/link';

import { Copy } from 'lucide-react';

import { ROUTES } from '@/constants';

import styles from './FestivalInfo.module.css';

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

export default function FestivalInfo({ festival }: { festival: Festival }) {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(festival?.address);
  };

  return (
    <div className={styles.festivalInfoContent}>
      <h2 className={styles.festivalName}>{festival?.name}</h2>
      <p className={styles.festivalDate}>
        {festival?.startDate} ~ {festival?.endDate}
      </p>
      <div
        className={styles.festivalAddressContainer}
        onClick={handleCopyClick}
      >
        <p className={styles.festivalAddress}>{festival?.address}</p>
        <Copy />
      </div>
      <p className={styles.festivalNumber}>☎️ {festival?.festivalNumber}</p>
      <Link
        href={ROUTES.FEED(festival?.id.toString())}
        className={styles.snsButton}
      >
        SNS 구경하기
      </Link>
    </div>
  );
}
