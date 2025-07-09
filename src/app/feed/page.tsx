'use client';

import { useState } from 'react';

import { CirclePlus } from 'lucide-react';

import Comment from './components/comment';
import FeedCard from './components/feedCard';
import styles from './feed.module.css';
import mockData from './mockData.json';

export default function Feed() {
  const [showComment, setShowComment] = useState(false);
  const handleShowComment = () => setShowComment(true);
  const handleHideComment = () => setShowComment(false);

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
      <CirclePlus className={styles.add_feed_button} />
    </div>
  );
}
