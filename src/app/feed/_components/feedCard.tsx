'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import {
  ChevronDown,
  ChevronUp,
  Heart,
  MessageCircle,
  MoreHorizontal,
} from 'lucide-react';

import { ROUTES } from '@/constants/routes';

import EditModal from './editModal';
import styles from './feedCard.module.css';

interface Feed {
  id: number;
  image: string;
  content: string;
  user: {
    id: number;
    name: string;
    createdAt: string;
    description: string;
    image: string;
  };
  comments: {
    id: number;
    content: string;
    createdAt: string;
  }[];
  favorites: {
    id: number;
    name: string;
    createdAt: string;
  }[];
}

export default function FeedCard({
  feed,
  onCommentClick,
}: {
  feed: Feed;
  onCommentClick: () => void;
}) {
  const [showFullContent, setShowFullContent] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const maxLength = 120;

  const isLong = feed.content.length > maxLength;
  const displayContent = showFullContent
    ? feed.content
    : feed.content.slice(0, maxLength);

  const handleEditFeed = () => {
    setShowEditModal(true);
    setShowDropdown(false);
  };

  const handleSaveEdit = (updatedData: {
    content: string;
    image: string | File;
  }) => {
    console.log('수정된 데이터:', updatedData);
    // 여기서 API 호출하여 서버에 업데이트 요청
    // updatedData.image가 File 타입이면 새 이미지, string이면 기존 이미지 URL
  };

  return (
    <div className={styles.feed_card_container}>
      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        feed={feed}
        onSave={handleSaveEdit}
      />
      <div className={styles.image_wrapper}>
        <Image
          src={feed.image}
          alt="피드 이미지"
          fill
          className={styles.feed_image}
        />
      </div>
      <div className={styles.feed_info_container}>
        <div className={styles.user_info_container}>
          <Link href={ROUTES.MYPAGE(String(feed.user.id))}>
            <div className={styles.user_info_wrapper}>
              <div className={styles.user_profile_image_container}>
                <Image
                  src={feed.user.image}
                  alt="유저 이미지"
                  fill
                  className={styles.user_profile_image}
                />
              </div>
              <p className={styles.user_name}>{feed.user.name}</p>
            </div>
          </Link>
          <p className={styles.user_created_at}>{feed.user.createdAt}</p>
          <div className={styles.user_menu_container}>
            <p className={styles.user_favorite_count}>
              <Heart className={styles.user_favorite_count_icon} />
              {feed.favorites.length}
            </p>
            <p
              className={styles.user_comment_count}
              onClick={() => onCommentClick()}
            >
              <MessageCircle className={styles.user_comment_count_icon} />
              {feed.comments.length}
            </p>
            <div
              className={styles.user_menu}
              ref={dropdownRef}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <MoreHorizontal className={styles.user_menu_icon} />
              {showDropdown && (
                <div className={styles.dropdown_menu}>
                  <button
                    className={styles.dropdown_menu_button}
                    onClick={handleEditFeed}
                  >
                    수정하기
                  </button>
                  <button className={styles.dropdown_menu_button}>
                    삭제하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.feed_content_container}>
          <p className={styles.feed_content}>
            {displayContent}
            {!showFullContent && isLong && '...'}
          </p>
          {isLong && (
            <button
              className={styles.more_button}
              onClick={() => setShowFullContent((prev) => !prev)}
            >
              {showFullContent ? <ChevronUp /> : <ChevronDown />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
