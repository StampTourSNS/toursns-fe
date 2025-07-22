'use client';

import { MessageCircle } from 'lucide-react';

import { Message } from '../types';

import styles from './MessageList.module.css';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className={styles.emptyState}>
        <MessageCircle size={48} />
        <p>메시지를 보내보세요!</p>
      </div>
    );
  }

  return (
    <div className={styles.messagesContainer}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${styles.message} ${
            message.showConfetti ? styles.messageWithConfetti : ''
          } ${message.isRemoving ? styles.messageRemoving : ''}`}
        >
          <div className={styles.messageContent}>
            <span className={styles.messageText}>{message.text}</span>
            <span className={styles.nickname}>사용자</span>
            <span className={styles.messageTime}>
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
