'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { X } from 'lucide-react';

import styles from './editModal.module.css';

interface Feed {
  id: number;
  image: string;
  content: string;
  user: {
    id: number;
    name: string;
    createdAt: string;
    description: string;
    image: string;
  };
  comments: {
    id: number;
    content: string;
    createdAt: string;
  }[];
  favorites: {
    id: number;
    name: string;
    createdAt: string;
  }[];
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  feed: Feed | null;
  onSave: (updatedFeed: { content: string; image: string | File }) => void;
}

export default function EditModal({
  isOpen,
  onClose,
  feed,
  onSave,
}: EditModalProps) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 피드 데이터가 변경될 때마다 상태 업데이트
  useEffect(() => {
    if (feed) {
      setContent(feed.content);
      setImage(feed.image);
      setNewImageFile(null);
    }
  }, [feed]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setNewImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (feed) {
      const updatedData = {
        content,
        image: newImageFile || feed.image, // 새 파일이 있으면 파일, 없으면 기존 이미지 URL
      };
      onSave(updatedData);
      onClose();
    }
  };

  const handleCancel = () => {
    setContent(feed?.content || '');
    setImage(feed?.image || null);
    setNewImageFile(null);
    onClose();
  };

  if (!isOpen || !feed) return null;

  return (
    <div className={styles.edit_modal_overlay} onClick={onClose}>
      <div
        className={styles.edit_modal_container}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.edit_modal_header}>
          <h2>피드 수정</h2>
          <button className={styles.close_button} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.edit_modal_content}>
          <div className={styles.image_section}>
            <div
              className={styles.image_upload_area}
              onClick={() => fileInputRef.current?.click()}
            >
              {image ? (
                <Image
                  src={image}
                  alt="피드 이미지"
                  width={200}
                  height={200}
                  className={styles.preview_image}
                />
              ) : (
                <div className={styles.upload_placeholder}>
                  <span>이미지 선택</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </div>
            {newImageFile && (
              <p className={styles.new_image_notice}>
                새 이미지가 선택되었습니다
              </p>
            )}
          </div>

          <div className={styles.content_section}>
            <textarea
              className={styles.content_textarea}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              rows={5}
            />
          </div>
        </div>

        <div className={styles.edit_modal_footer}>
          <button className={styles.cancel_button} onClick={handleCancel}>
            취소
          </button>
          <button className={styles.save_button} onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
