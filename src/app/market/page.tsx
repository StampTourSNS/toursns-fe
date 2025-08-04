import { getMarketItem } from '@/api/market';

import ItemCard from './_components/itemCard';
import styles from './market.module.css';

export default async function Market() {
  const items = await getMarketItem();
  console.log(items);
  return (
    <div className={styles.market_container}>
      <div className={styles.market_header_container}>
        <h1>코인 교환으로 축제를 같이 즐겨요</h1>
      </div>
      <div className={styles.market_mydata_container}>
        <p>내 코인</p>
        <p>10000P</p>
      </div>
      <div className={styles.market_content_item_container}>아이템</div>
      <div className={styles.market_content_item_list_container}>
        {items.data.map((item) => (
          <ItemCard key={item.itemId} item={item} />
        ))}
      </div>
    </div>
  );
}
