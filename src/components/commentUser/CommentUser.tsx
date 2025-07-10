'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { Ellipsis, User } from 'lucide-react';

import styles from './CommentUser.module.css';

interface CommentUserProps {
  imageUrl: string | null;
  name: string;
  comment: string;
  isUser: boolean;
}

export default function CommentUser({
  imageUrl,
  name,
  comment,
  isUser,
}: CommentUserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEllipsisClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const renderUserImage = () => (
    <div className={styles.comment_user_image}>
      {imageUrl && imageUrl !== 'null' ? (
        <Image src={imageUrl} alt={`${name} 프로필`} width={42} height={42} />
      ) : (
        <User size={42} color="#FF6F61" />
      )}
    </div>
  );

  const renderMenu = () => (
    <div className={styles.comment_user_menu_container}>
      <div className={styles.comment_user_menu_item}>
        <p
          onClick={() => {
            console.log('삭제');
          }}
        >
          삭제
        </p>
      </div>
      <div className={styles.comment_user_menu_item}>
        <p
          onClick={() => {
            console.log('수정');
          }}
        >
          수정
        </p>
      </div>
    </div>
  );

  return (
    <div className={styles.comment_user_container} ref={containerRef}>
      <div className={styles.comment_user_info_container}>
        {renderUserImage()}
        <div className={styles.comment_user_info}>
          <div className={styles.comment_user_name}>
            <p>{name}</p>
          </div>
          <div className={styles.comment_user_comment}>
            <p>{comment}</p>
          </div>
        </div>
      </div>

      {isUser && (
        <div>
          <Ellipsis
            size={24}
            color="#000"
            style={{ cursor: 'pointer' }}
            onClick={handleEllipsisClick}
            className={styles.comment_user_ellipsis}
          />
        </div>
      )}

      {isOpen && renderMenu()}
    </div>
  );
}
