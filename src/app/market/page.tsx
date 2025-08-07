'use client';

import { useEffect, useState } from 'react';

import { getMarketItem, MarketItem } from '@/api/market';

import ItemCard from './_components/itemCard';
import styles from './market.module.css';

export default function Market() {
  const [items, setItems] = useState<MarketItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMarketItem();
        setItems(data);
      } catch (error) {
        console.error('Failed to fetch market items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

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
        {items?.data?.map((item) => (
          <ItemCard key={item.itemId} item={item} />
        ))}
      </div>
    </div>
  );
}
