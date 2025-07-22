'use client';

import { ConfettiEffect } from './_components/ConfettiEffect';
import { LiveHeader } from './_components/LiveHeader';
import { MessageInput } from './_components/MessageInput';
import { MessageList } from './_components/MessageList';
import { PaperPlane } from './_components/PaperPlane';
import { useLiveStream } from './hooks/useLiveStream';
import styles from './page.module.css';

export default function Live() {
  const {
    messages,
    inputMessage,
    paperPlanes,
    handleSendMessage,
    setInputMessage,
  } = useLiveStream();

  return (
    <div className={styles.liveContainer}>
      {/* 폭죽 효과들 */}
      <ConfettiEffect messages={messages} />

      {/* 종이비행기들 */}
      <PaperPlane paperPlanes={paperPlanes} />

      {/* 헤더 */}
      <LiveHeader title="라이브 스트리밍" viewerCount={1234} />

      {/* 메시지 목록 */}
      <MessageList messages={messages} />

      {/* 메시지 입력 */}
      <MessageInput
        inputMessage={inputMessage}
        onInputChange={setInputMessage}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
