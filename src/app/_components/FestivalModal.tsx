import Link from 'next/link';

import { X } from 'lucide-react';

import { ROUTES } from '@/constants/routes';

import styles from './FestivalModal.module.css';

interface Festival {
  id: number;
  name: string;
  image: string;
  address: string;
  startDate: string;
  endDate: string;
  festivalRegion: string;
  active: string;
}

export default function FestivalModal({
  setOpenModal,
  selectedFestival,
  selectedRegion,
  regionCoordinates,
}: {
  setOpenModal: (openModal: boolean) => void;
  selectedFestival: Festival[];
  selectedRegion: string;
  regionCoordinates: { id: string; name: string; x: number; y: number }[];
}) {
  const selectedRegionData = regionCoordinates.find(
    (region) => region.id === selectedRegion,
  );

  if (!selectedRegionData) return null;

  // 지역 좌표를 화면 좌표로 변환 (viewBox 기준)
  const modalLeft = `${((selectedRegionData.x - 2370) / 400) * 100}%`;
  const modalTop = `${((selectedRegionData.y - 330) / 300) * 100}%`;

  return (
    <div className={styles.modal_container}>
      <div
        className={styles.modal_content}
        style={{
          position: 'absolute',
          left: modalLeft,
          top: modalTop,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className={styles.modal_header}>
          <h2>{selectedRegionData.name}</h2>
          <button
            className={styles.close_button}
            onClick={() => setOpenModal(false)}
          >
            <X />
          </button>
        </div>
        <div className={styles.festival_list}>
          {selectedFestival.length === 0 ? (
            <p>이 지역에는 축제가 없습니다.</p>
          ) : (
            selectedFestival.map((festival) => (
              <Link
                href={ROUTES.FESTIVAL_DETAIL(String(festival.id))}
                key={festival.id}
                className={`${styles.festival_item} ${styles.status} ${styles[festival.active.toLowerCase()]}`}
              >
                <h3>{festival.name}</h3>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
