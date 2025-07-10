import Image from 'next/image';

import styles from './Card.module.css';

interface PostCardProps {
  id: number;
  image: string;
  onClick: (id: number) => void;
}

export default function Card({ id, image, onClick }: PostCardProps) {
  return (
    <div className={styles.post_card} onClick={() => onClick(id)}>
      <Image
        src={image}
        alt="게시물 이미지"
        fill
        className={styles.post_image}
        sizes="(max-width: 768px) 33vw, 300px"
      />
    </div>
  );
}
