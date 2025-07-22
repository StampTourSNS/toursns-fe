import Image from 'next/image';

import styles from './itemCard.module.css';

interface Item {
  id: number;
  name: string;
  description: string;
  image: string;
  items: Array<{
    itemId: string;
    acquiredAt: string;
  }>;
}

export default function ItemCard({ item }: { item: Item }) {
  return (
    <div className={styles.item_card_container}>
      <div className={styles.item_card_image_container}>
        <Image
          src={item.image}
          alt="아이템 이미지"
          className={styles.item_card_image}
          width={200}
          height={200}
        />
        <div className={styles.item_count}>
          <span className={styles.item_count_x}>X</span>
          {item.items.length}
        </div>
      </div>
      <div className={styles.item_card_info}>
        <h3>{item.name}</h3>
        <p className={styles.item_description}>{item.description}</p>
      </div>
    </div>
  );
}
