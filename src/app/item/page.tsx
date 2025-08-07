'use client';

import { useEffect, useState } from 'react';

import { getMyItem, MyItemResponse } from '@/api/myitem';

import ItemCard from './_components/itemCard';
import styles from './item.module.css';

export default function Item() {
  const [myItem, setMyItem] = useState<MyItemResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyItem();
        setMyItem(data);
      } catch (error) {
        console.error('Failed to fetch items:', error);
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
    <div className={styles.item_container}>
      <div className={styles.item_header_container}>
        <h1>마이 아이템</h1>
      </div>
      <div className={styles.item_content_container}>
        {myItem?.data?.map((item) => (
          <ItemCard key={item.itemId} item={item} />
        ))}
      </div>
    </div>
  );
}
