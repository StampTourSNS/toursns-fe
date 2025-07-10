// 스탬프 개수 적히는 칩
import React from 'react';
import styles from './countChip.module.css';

interface CountChipProps {
  stampCount: number;
}

const CountChip: React.FC<CountChipProps> = ({ stampCount }) => {
  const chipStyle = stampCount > 0 ? styles.active : styles.inactive;

  return (
    <div className={`${styles.chip} ${chipStyle}`}>
      {stampCount}
    </div>
  );
};

export default CountChip;
