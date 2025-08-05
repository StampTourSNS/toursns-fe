'use client';

import React, { useRef, useState } from 'react';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { ChevronRight, Send } from 'lucide-react';

import { ROUTES } from '@/constants/routes';

import styles from './addFeed.module.css';

const AddFeed = () => {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();
  const router = useRouter();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };
  const isButtonDisabled = !image && !text;

  const handleNextClick = () => {
    setShowTextInput(true);
  };

  const handleSendClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(ROUTES.FEED(id as string));
  };

  return (
    <div className={styles.add_feed_container}>
      <form className={styles.left_box}>
        <div
          className={styles.image_upload_box}
          onClick={() => fileInputRef.current?.click()}
        >
          {image ? (
            <Image
              src={image}
              alt="preview"
              className={styles.preview_img}
              width={100}
              height={100}
            />
          ) : (
            <>
              <span className={styles.plus_icon}>＋</span>
              <span>이미지 선택</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
            name="image"
          />
        </div>
        {!showTextInput && (
          <button className={styles.next_btn} onClick={handleNextClick}>
            <ChevronRight size={28} />
          </button>
        )}
        {showTextInput && (
          <>
            <textarea
              className={styles.textarea}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="내용을 입력하세요"
              name="text"
            />
            <button
              className={`${styles.send_btn} ${isButtonDisabled ? styles.disabled : ''}`}
              onClick={handleSendClick}
              type="submit"
              disabled={isButtonDisabled}
            >
              <Send size={28} />
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default AddFeed;
