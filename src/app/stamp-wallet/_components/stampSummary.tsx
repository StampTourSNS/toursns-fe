import React from 'react';
import styles from './stampSummary.module.css';

interface StampSummaryProps {
  total: number;
}

const StampSummary: React.FC<StampSummaryProps> = ({ total }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainText}>
        보유 중인 스탬프: <span className={styles.highlight}>{total}개</span>
      </div>
      <div className={styles.subText}>· 현재 보유하고 있는 스탬프를 확인할 수 있습니다.</div>
      <div className={styles.subText}>· 스탬프를 많이 모으면 다양한 혜택이 주어집니다.</div>
    </div>
  );
};

export default StampSummary;
