'use client';

import { useEffect, useRef, useState } from 'react';

import { ChevronDown } from 'lucide-react';

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
  const [isVisible, setIsVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      // 약간의 지연을 두어 DOM이 업데이트된 후 애니메이션 시작
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
    }
  }, [show]);

  // 닫기 버튼 클릭 핸들러
  const handleClose = () => {
    setIsVisible(false);
    // 애니메이션 완료 후 부모에게 닫기 신호 전송
    setTimeout(() => {
      onClose();
    }, 300); // transition 시간과 동일
  };

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
    <div
      className={`${styles.comment_container} ${isVisible ? styles.show : ''}`}
      ref={dropdownRef}
    >
      <button className={styles.close_btn} onClick={handleClose}>
        <ChevronDown />
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
