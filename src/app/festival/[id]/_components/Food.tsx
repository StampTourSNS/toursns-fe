import Image from 'next/image';

import styles from './Food.module.css';

interface Food {
  name: string;
  image: string;
}

export default function Food({ foodList }: { foodList: Food[] }) {
  return (
    <div className={styles.foodList}>
      {foodList.map((food) => (
        <div key={food.name} className={styles.foodItem}>
          <Image
            src={food.image}
            alt={food.name}
            width={100}
            height={100}
            className={styles.foodImage}
          />
          <p className={styles.foodName}>{food.name}</p>
        </div>
      ))}
    </div>
  );
}
