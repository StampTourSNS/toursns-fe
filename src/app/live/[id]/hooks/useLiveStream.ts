'use client';

import { useEffect, useState } from 'react';

import { Message, PaperPlane } from '../types';

export function useLiveStream() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [paperPlanes, setPaperPlanes] = useState<PaperPlane[]>([]);
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

  const triggerConfetti = (messageId: string) => {
    const newConfettiKey = confettiKey + 1;
    setConfettiKey(newConfettiKey);

    // 메시지에 폭죽 효과 추가
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, showConfetti: true, confettiKey: newConfettiKey }
          : msg,
      ),
    );

    // 5초 후 폭죽 효과 제거
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, showConfetti: false } : msg,
        ),
      );
    }, 5000);
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

      // 메시지 표시
      const newMessage: Message = {
        id: Date.now().toString(),
        text: newPaperPlane.message,
        timestamp: new Date(),
        showConfetti: false,
      };
      setMessages((prev) => [...prev, newMessage]);

      // 폭죽 효과 트리거
      triggerConfetti(newMessage.id);

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

  return {
    messages,
    inputMessage,
    paperPlanes,
    handleSendMessage,
    setInputMessage,
  };
}
