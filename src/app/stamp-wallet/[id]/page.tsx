'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import titleImage from '../../../../public/images/title.png';

import styles from './page.module.css';

interface StampDetail {
  festivalId: number;
  festivalName: string;
  content: string;
  stampDate: string;
  image?: string | null;
}

export default function RegionStampPage() {
  const { id } = useParams();
  const regionId = String(id);
  const [stampList, setStampList] = useState<StampDetail[]>([]);

  useEffect(() => {
    // 실제 API 호출로 교체
    setStampList([
      {
        festivalId: 10,
        festivalName: '진해군항제',
        content: '축제 인증',
        stampDate: '2025-10-01',
        image: 'https://picsum.photos/200/300',
      },
      {
        festivalId: 13,
        festivalName: '진해군항제',
        content: '게시글 작성',
        stampDate: '2025-10-01',
        image: '',
      },
      {
        festivalId: 14,
        festivalName: '마산 아맥축제',
        content: '축제 인증',
        stampDate: '2025-10-01',
        image: null,
      },
      {
        festivalId: 16,
        festivalName: '마산 아맥축제',
        content: '게시글 작성',
        stampDate: '2025-10-01',
        image: 'https://picsum.photos/200/300',
      },
    ]);
  }, [regionId]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        획득한 지역 스탬프 :{' '}
        <span className={styles.count}>{stampList.length}개</span>
      </h2>
      {stampList.length === 0 && (
        <p className={styles.emptyMessage}>아직 획득한 스탬프가 없습니다.</p>
      )}

      <div className={styles.grid}>
        {stampList.map((stamp) => {
          const fallbackImage = `/images/stamp/${regionId}.png`;
          const hasImage = stamp.image && stamp.image.trim() !== '';
          const displayImage = hasImage ? stamp.image! : fallbackImage;
          return (
            <div key={stamp.festivalId} className={styles.card}>
              <div className={styles.imageBox}>
                <Image
                  src={displayImage}
                  alt={stamp.festivalName}
                  className={hasImage ? styles.roundImage : styles.stampImage}
                  width={150}
                  height={150}
                />
                <Image
                  src={titleImage}
                  alt="리본"
                  className={styles.festivalTitle}
                />
                <div className={styles.festivalNameText}>
                  {stamp.festivalName}
                </div>
              </div>
              <div className={styles.content}>{stamp.content}</div>
              <div className={styles.date}>{stamp.stampDate}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
