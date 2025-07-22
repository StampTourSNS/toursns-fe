'use client';

import styles from './LiveHeader.module.css';

interface LiveHeaderProps {
  title: string;
  viewerCount: number;
}

export function LiveHeader({ title, viewerCount }: LiveHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.liveIndicator}>
        <div className={styles.liveDot} />
        <span>{viewerCount.toLocaleString()}</span>
      </div>

      <h1 className={styles.title}>{title}</h1>

      <div className={styles.viewerCount}>🎉 3개</div>
    </header>
  );
}
