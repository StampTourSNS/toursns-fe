import Image from 'next/image';

import { User } from 'lucide-react';

import styles from './RankUser.module.css';

interface RankUserProps {
  cnt: number;
  imageUrl: string | null;
  name: string;
}

export default function RankUser({ cnt, imageUrl, name }: RankUserProps) {
  return (
    <div className={styles.rank_user}>
      <div className={styles.rank_user_image}>
        {imageUrl ? (
          <Image src={imageUrl} alt={`${name} 프로필`} width={62} height={62} />
        ) : (
          <User size={62} color="#FF6F61" />
        )}
      </div>
      <div className={styles.rank_user_name}>
        <p>{name}</p>
      </div>
      <div className={styles.rank_user_cnt}>
        <p>{cnt}개</p>
      </div>
    </div>
  );
}
