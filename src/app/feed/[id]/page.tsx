'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { CirclePlus } from 'lucide-react';

import Nav from '@/components/nav/Nav';
import { ROUTES } from '@/constants/routes';

import Comment from '../_components/comment';
import FeedCard from '../_components/feedCard';
import mockData from '../mockData.json';

import styles from './feed.module.css';

export default function Feed() {
  const [showComment, setShowComment] = useState(false);
  const handleShowComment = () => setShowComment(true);
  const handleHideComment = () => setShowComment(false);
  const { id } = useParams();

  return (
    <div className={styles.feed_container}>
      {mockData.feed.map((feed) => (
        <FeedCard
          key={feed.id}
          feed={feed}
          onCommentClick={handleShowComment}
        />
      ))}
      {showComment && (
        <Comment
          show={showComment}
          onClose={handleHideComment}
          feed={mockData.feed[0]}
        />
      )}
      <Link href={ROUTES.ADD_FEED(id as string)}>
        <CirclePlus className={styles.add_feed_button} />
      </Link>
      <Nav isActive={true} id={id as string} />
    </div>
  );
}
