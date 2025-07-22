import Image from 'next/image';

import styles from './Tour.module.css';

interface Tour {
  id: number;
  name: string;
  image: string;
}

export default function Tour({ tourList }: { tourList: Tour[] }) {
  return (
    <div className={styles.tourList}>
      {tourList.map((tour) => (
        <div key={tour.id} className={styles.tourItem}>
          <Image
            src={tour.image}
            alt={tour.name}
            width={100}
            height={100}
            className={styles.tourImage}
          />
          <p className={styles.tourName}>{tour.name}</p>
        </div>
      ))}
    </div>
  );
}
