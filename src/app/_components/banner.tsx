'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { ROUTES } from '@/constants/routes';

import styles from './Banner.module.css';

interface BannerProps {
  hotFestival: {
    id: string;
    name: string;
    image: string;
    address: string;
    startDate: string;
    endDate: string;
  }[];
}

export default function Banner({ hotFestival }: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동 슬라이드 (5초마다)
  useEffect(() => {
    if (hotFestival.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % hotFestival.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hotFestival.length]);

  // 이전 슬라이드
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? hotFestival.length - 1 : prev - 1));
  };

  // 다음 슬라이드
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % hotFestival.length);
  };

  // 특정 슬라이드로 이동
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (hotFestival.length === 0) {
    return null;
  }

  const currentFestival = hotFestival[currentIndex];

  return (
    <div className={styles.banner_container}>
      {/* 메인 슬라이드 */}
      <div className={styles.slide_container}>
        <Link
          href={`${ROUTES.FESTIVAL}/${currentFestival.id}`}
          className={styles.festival_link}
        >
          <Image
            src={currentFestival.image}
            alt={currentFestival.name}
            width={283}
            height={400}
            className={styles.festival_image}
          />
          <div className={styles.festival_info}>
            <h3 className={styles.festival_name}>{currentFestival.name}</h3>
            <p className={styles.festival_address}>{currentFestival.address}</p>
            <p className={styles.festival_date}>
              {currentFestival.startDate} ~ {currentFestival.endDate}
            </p>
          </div>
        </Link>

        {/* 네비게이션 버튼 */}
        {hotFestival.length > 1 && (
          <>
            <button
              className={`${styles.nav_button} ${styles.prev_button}`}
              onClick={goToPrevious}
              aria-label="이전 슬라이드"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`${styles.nav_button} ${styles.next_button}`}
              onClick={goToNext}
              aria-label="다음 슬라이드"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* 인디케이터 (점) */}
      {hotFestival.length > 1 && (
        <div className={styles.indicators}>
          {hotFestival.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === currentIndex ? styles.active : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`슬라이드 ${index + 1}로 이동`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
