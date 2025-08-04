import Image from 'next/image';

import styles from './itemCard.module.css';

interface Item {
  itemId: number;
  itemName: string;
  price: number;
  content: string;
  imageUrl: string;
}

export default function ItemCard({ item }: { item: Item }) {
  return (
    <div className={styles.item_card_container}>
      <div className={styles.item_card_image_container}>
        <Image
          src={item.imageUrl}
          alt="아이템 이미지"
          className={styles.item_card_image}
          width={200}
          height={200}
        />
      </div>
      <div className={styles.item_card_info}>
        <h3>{item.itemName}</h3>
        <p className={styles.item_description}>{item.content}</p>
      </div>
      <div className={styles.item_card_price_container}>
        <p className={styles.item_card_price}>{item.price}P</p>
        <button className={styles.item_card_buy_button}>구매하기</button>
      </div>
    </div>
  );
}
