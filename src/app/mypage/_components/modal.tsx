'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { Camera, User, X } from 'lucide-react';

import styles from './modal.module.css';

export default function Modal({
  isOpen,
  onClose,
  currentProfileImage,
}: {
  isOpen: boolean;
  onClose: () => void;
  currentProfileImage?: string | null;
}) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 모달이 닫힐 때 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setPreviewImage(null);
      setNickname('');
      setSelectedFile(null);
    }
  }, [isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (selectedFile) {
      formData.append('image', selectedFile);
    }

    if (nickname.trim()) {
      formData.append('nickname', nickname.trim());
    }

    console.log('FormData:', formData);
    console.log('닉네임:', nickname);
    console.log('선택된 파일:', selectedFile);

    onClose();
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const displayImage = previewImage || currentProfileImage;

  return (
    <div className={styles.modal_container} onClick={handleBackdropClick}>
      <div className={styles.modal_content}>
        <form onSubmit={handleSubmit}>
          <div className={styles.modal_header}>
            <h2>프로필 수정</h2>
            <button type="button" onClick={onClose}>
              <X className={styles.modal_header_icon} />
            </button>
          </div>

          <div className={styles.image_container}>
            <div className={styles.image_wrapper} onClick={handleImageClick}>
              {displayImage ? (
                <Image
                  src={displayImage}
                  alt="프로필 이미지"
                  className={styles.preview_image}
                  fill
                />
              ) : (
                <User className={styles.user_image} />
              )}
              <div className={styles.camera_overlay}>
                <Camera className={styles.camera_icon} />
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.hidden_input}
            />
          </div>

          <input
            type="text"
            placeholder="닉네임을 입력해주세요"
            className={styles.nickname_input}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <button className={styles.confirm_button} type="submit">
            확인
          </button>
        </form>
      </div>
    </div>
  );
}
