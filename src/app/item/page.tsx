import { getMyItem } from '@/api/myitem';

import ItemCard from './_components/itemCard';
import styles from './item.module.css';

export default async function Item() {
  const myItem = await getMyItem();
  // console.log(myItem);
  return (
    <div className={styles.item_container}>
      <div className={styles.item_header_container}>
        <h1>마이 아이템</h1>
      </div>
      <div className={styles.item_content_container}>
        {myItem.data.map((item) => (
          <ItemCard key={item.itemId} item={item} />
        ))}
      </div>
    </div>
  );
}
