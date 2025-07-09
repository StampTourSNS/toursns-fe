import Image from 'next/image';

import { User } from 'lucide-react';

import styles from './RankUser.module.css';

interface RankUserProps {
  imageUrl: string;
  name: string;
  cnt: number;
}

export default function RankUser({ imageUrl, name, cnt }: RankUserProps) {
  return (
    <div className={styles.rank_user_container}>
      <div className={styles.rank_user_info_container}>
        <div className={styles.rank_user_image}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${name} 프로필`}
              width={42}
              height={42}
            />
          ) : (
            <User size={42} color="#FF6F61" />
          )}
        </div>
        <div className={styles.rank_user_name}>
          <p>{name}</p>
        </div>
      </div>
      <div className={styles.rank_user_cnt}>
        <p>{cnt}개</p>
      </div>
    </div>
  );
}
