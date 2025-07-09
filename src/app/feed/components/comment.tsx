'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { MoreHorizontal, User, X } from 'lucide-react';

import mockData from '../mockData.json';

import styles from './comment.module.css';

export default function Comment({
  show,
  onClose,
  feed,
}: {
  show: boolean;
  onClose: () => void;
  feed: (typeof mockData.feed)[0];
}) {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdownId(null);
      }
    }
    if (openDropdownId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdownId]);

  return (
    <div className={`${styles.comment_container} ${show ? styles.show : ''}`}>
      <button className={styles.close_btn} onClick={onClose}>
        <X />
      </button>
      {feed.comments.map((comment) => (
        <div className={styles.comment_content} key={comment.id}>
          {comment.user.image !== 'null' ? (
            <Image
              src={comment.user.image}
              width={38}
              height={38}
              alt={'profileImage'}
              className={styles.comment_user_profile_image}
            />
          ) : (
            <User
              className={styles.comment_user_profile_image}
              size={38}
              strokeWidth={1.5}
            />
          )}
          <div className={styles.comment_user_info}>
            <p className={styles.comment_user_name}>{comment.user.name}</p>
            <p>{comment.content}</p>
          </div>
          <div className={styles.comment_user_menu_container}>
            <div
              className={styles.comment_user_menu_icon_container}
              onClick={() =>
                setOpenDropdownId(
                  openDropdownId === comment.id ? null : comment.id,
                )
              }
            >
              <MoreHorizontal
                size={16}
                strokeWidth={1.5}
                className={styles.comment_user_menu_icon}
              />
            </div>
            {openDropdownId === comment.id && (
              <div className={styles.comment_dropdown_menu} ref={dropdownRef}>
                <button className={styles.comment_dropdown_menu_button}>
                  수정하기
                </button>
                <button className={styles.comment_dropdown_menu_button}>
                  삭제하기
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
