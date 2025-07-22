'use client';

import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';

import styles from './page.module.css';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  showConfetti: boolean;
  isRemoving?: boolean;
}

interface PaperPlane {
  id: string;
  message: string;
  isExploding: boolean;
}

export default function Live() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [paperPlanes, setPaperPlanes] = useState<PaperPlane[]>([]);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [confettiKey, setConfettiKey] = useState<number>(0);

  // 페이지 로드 시 전체 스크롤 차단
  useEffect(() => {
    const originalBodyStyle = window.getComputedStyle(document.body).overflow;
    const originalHtmlStyle = window.getComputedStyle(
      document.documentElement,
    ).overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // 페이지 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = originalBodyStyle;
      document.documentElement.style.overflow = originalHtmlStyle;
    };
  }, []);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setConfettiKey((prev) => prev + 1);

    // 여러 번 폭죽 효과 트리거
    setTimeout(() => {
      setConfettiKey((prev) => prev + 1);
    }, 200);

    setTimeout(() => {
      setConfettiKey((prev) => prev + 1);
    }, 400);

    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    const newPaperPlane: PaperPlane = {
      id: `paperplane-${Date.now()}`,
      message: inputMessage,
      isExploding: false,
    };

    setPaperPlanes((prev) => [...prev, newPaperPlane]);
    setInputMessage('');

    // 종이비행기가 날아가는 시간 (2초)
    setTimeout(() => {
      setPaperPlanes((prev) =>
        prev.map((plane) =>
          plane.id === newPaperPlane.id
            ? { ...plane, isExploding: true }
            : plane,
        ),
      );

      // 폭죽 효과 트리거
      triggerConfetti();

      // 메시지 표시
      const newMessage: Message = {
        id: Date.now().toString(),
        text: newPaperPlane.message,
        timestamp: new Date(),
        showConfetti: true,
      };
      setMessages((prev) => [...prev, newMessage]);

      // 종이비행기 제거
      setTimeout(() => {
        setPaperPlanes((prev) =>
          prev.filter((plane) => plane.id !== newPaperPlane.id),
        );
      }, 1000);

      // 5초 후 메시지 제거
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, isRemoving: true } : msg,
          ),
        );

        // 페이드아웃 애니메이션 후 실제 제거
        setTimeout(() => {
          setMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id));
        }, 300);
      }, 5000);
    }, 2000);
  };

  return (
    <div className={styles.liveContainer}>
      {/* 폭죽 효과 */}
      {showConfetti && (
        <>
          <Confetti
            key={`confetti-1-${confettiKey}`}
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={150}
            gravity={0.2}
            wind={0.1}
            colors={[
              '#ff6f61',
              '#ffd93d',
              '#6bcf7f',
              '#4d9de0',
              '#e15554',
              '#ff8a80',
              '#ffb74d',
            ]}
            confettiSource={{
              x: window.innerWidth * 0.5,
              y: window.innerHeight * 0.4,
              w: 14,
              h: 14,
            }}
          />
        </>
      )}

      {/* 종이비행기들 */}
      <AnimatePresence>
        {paperPlanes.map((paperPlane) => (
          <motion.div
            key={paperPlane.id}
            className={`${styles.paperPlane} ${paperPlane.isExploding ? styles.exploding : ''}`}
            initial={{
              x: '20%',
              y: '100%',
              rotate: -45,
              scale: 0.5,
            }}
            animate={
              paperPlane.isExploding
                ? {
                    x: '20%',
                    y: '40%',
                    rotate: 0,
                    scale: [1, 1.5, 0],
                  }
                : {
                    x: '20%',
                    y: '40%',
                    rotate: -45,
                    scale: 1,
                  }
            }
            transition={
              paperPlane.isExploding
                ? {
                    duration: 1,
                    ease: 'easeOut',
                  }
                : {
                    duration: 2,
                    ease: 'easeInOut',
                  }
            }
            exit={{ opacity: 0 }}
          >
            <div className={styles.paperPlaneContent}>
              <Send size={34} color="#fff" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 헤더 */}
      <div className={styles.header}>
        <div className={styles.liveIndicator}>
          <div className={styles.liveDot}></div>
          <span>1,234명</span>
        </div>
        <h1 className={styles.title}>축제 라이브 스트리밍</h1>
        <div className={styles.viewerCount}>
          <span>🎉 3개</span>
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className={styles.messagesContainer}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <MessageCircle size={48} />
            <p>메시지를 남겨보세요!</p>
          </div>
        ) : (
          messages.map((message) => (
            <motion.div
              key={message.id}
              className={`${styles.message} ${message.showConfetti ? styles.messageWithConfetti : ''} ${message.isRemoving ? styles.messageRemoving : ''}`}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.messageContent}>
                <span className={styles.messageText}>{message.text}</span>
                <span className={styles.nickname}>닉네임</span>
                <span className={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* 메시지 입력 */}
      <form
        className={styles.messageInputContainer}
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className={styles.messageInput}
          maxLength={100}
        />
        <button
          type="submit"
          className={styles.sendButton}
          disabled={!inputMessage.trim()}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
