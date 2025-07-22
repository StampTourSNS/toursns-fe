import ItemCard from './_components/itemCard';
import styles from './item.module.css';
import mockData from './mockData.json';

export default function Item() {
  return (
    <div className={styles.item_container}>
      <div className={styles.item_header_container}>
        <h1>마이 아이템</h1>
      </div>
      <div className={styles.item_content_container}>
        {Object.values(mockData.userItems).map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
