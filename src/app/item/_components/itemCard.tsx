// import Image from 'next/image';
import styles from './itemCard.module.css';

interface MyItem {
  // 이미지 추가 필요
  itemId: number;
  itemName: string;
  quantity: number;
}

export default function ItemCard({ item }: { item: MyItem }) {
  return (
    <div className={styles.item_card_container}>
      <div className={styles.item_card_image_container}>
        {/* <Image
          src={item.image}
          alt="아이템 이미지"
          className={styles.item_card_image}
          width={200}
          height={200}
        /> */}
        <div className={styles.item_count}>
          <span className={styles.item_count_x}>X</span>
          {item.quantity}
        </div>
      </div>
      <div className={styles.item_card_info}>
        <h3>{item.itemName}</h3>
        <p className={styles.item_description}>{item.itemName}</p>
      </div>
    </div>
  );
}
