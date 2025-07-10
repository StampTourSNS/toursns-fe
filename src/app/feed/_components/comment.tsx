'use client';

import { useEffect, useRef, useState } from 'react';

import { X } from 'lucide-react';

import CommentUser from '@/components/commentUser/CommentUser';

import mockData from '../mockData.json';

import styles from './comment.module.css';

interface CommentProps {
  show: boolean;
  onClose: () => void;
  feed: (typeof mockData.feed)[0];
}

export default function Comment({ show, onClose, feed }: CommentProps) {
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
        <CommentUser
          key={comment.id}
          imageUrl={comment.user?.image}
          name={comment.user?.name}
          comment={comment.content}
          isUser={true}
        />
      ))}
    </div>
  );
}
