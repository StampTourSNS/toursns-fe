'use client';

import { Send } from 'lucide-react';

import styles from './MessageInput.module.css';

interface MessageInputProps {
  inputMessage: string;
  onInputChange: (value: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  isDisabled?: boolean;
}

export function MessageInput({
  inputMessage,
  onInputChange,
  onSendMessage,
  isDisabled = false,
}: MessageInputProps) {
  return (
    <form onSubmit={onSendMessage} className={styles.messageInputContainer}>
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="메시지를 입력하세요..."
        className={styles.messageInput}
        disabled={isDisabled}
      />

      <button
        type="submit"
        className={styles.sendButton}
        disabled={isDisabled || !inputMessage.trim()}
      >
        <Send size={20} />
      </button>
    </form>
  );
}
