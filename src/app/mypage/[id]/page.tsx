'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Pencil, User } from 'lucide-react';

import { ROUTES } from '@/constants/routes';

import Card from '../_components/Card';
import Modal from '../_components/modal';
import mockData from '../mockData.json';

import styles from './mypage.module.css';

export default function MyPage() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  console.log(id);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleClick = (id: number) => {
    console.log(id);
  };
  return (
    <div className={styles.main_container}>
      <Modal isOpen={isOpen} onClose={handleClose} />
      <div className={styles.container}>
        <div className={styles.left_container}>
          <User className={styles.user_icon} />
        </div>
        <div className={styles.right_container}>
          <div className={styles.nickname}>
            닉네임
            <div className={styles.pencil_container} onClick={handleOpen}>
              <Pencil className={styles.pencil_icon} />
            </div>
          </div>
          {/* 닉네임 */}
          <div className={styles.user_info_container}>
            <div className={styles.user_info_item}>
              <p className={styles.user_info_item_number}>10</p>
              <p>게시글</p>
            </div>
            <div className={styles.user_info_item}>
              <p className={styles.user_info_item_number}>10</p>
              <p>팔로우</p>
            </div>
            <div className={styles.user_info_item}>
              <p className={styles.user_info_item_number}>10</p>
              <p>팔로잉</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.myPage_info_container}>
        <Link href={ROUTES.WALLET}>
          <div className={styles.myPage_info_item}>
            <p className={styles.myPage_info_item_title}>스탬프</p>
            <p className={styles.myPage_info_item_number}>100</p>
          </div>
        </Link>
        <div className={styles.myPage_info_item_divider} />
        <Link href={ROUTES.MARKET}>
          <div className={styles.myPage_info_item_center}>
            <p className={styles.myPage_info_item_title}>코인</p>
            <p className={styles.myPage_info_item_number}>100</p>
          </div>
        </Link>
        <div className={styles.myPage_info_item_divider} />
        <Link href={ROUTES.ITEM}>
          <div className={styles.myPage_info_item}>
            <p className={styles.myPage_info_item_title}>확성기</p>
            <p className={styles.myPage_info_item_number}>100</p>
          </div>
        </Link>
      </div>
      <div className={styles.mypage_post_container}>
        <h1 className={styles.mypage_post_title}>게시물</h1>
        <div className={styles.mypage_post_item}>
          {mockData.items.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              image={item.image}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
