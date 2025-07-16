import React from 'react';
import styles from './StatusChip.module.css';

export type StatusType = 'Ongoing' | 'Scheduled' | 'End';

interface StatusChipProps {
  status: StatusType;
}

const statusTextMap: Record<StatusType, string> = {
  Ongoing: '진행중',
  Scheduled: '진행예정',
  End: '마감됨',
};

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  return (
    <div className={`${styles.chip} ${styles[status]}`}>
      {statusTextMap[status]}
    </div>
  );
};

export default StatusChip;
