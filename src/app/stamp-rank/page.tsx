import RankUser from '@/components/rankUserProfile/RankUser';
import TopRankUser from '@/components/topRankUserProfile/TopRankUser';

import styles from './page.module.css';
import rankList from './rankList.json';
import topList from './topList.json';

const TOP_RANK_COUNT = 3; // Top 3 랭킹 개수

export default function StampRank() {
  const sortedTopList = [...topList.items].sort((a, b) => b.cnt - a.cnt);
  const sortedRankList = [...rankList.items].sort((a, b) => b.cnt - a.cnt);

  return (
    <div className={styles.stamp_rank_container}>
      <div className={styles.top_rank_user_container}>
        <div className={styles.podium}>
          <div className={`${styles.podium_block} ${styles.podium_2}`}>
            {/* 2위 */}
            <div className={styles.gray_block}></div>
            <div className={styles.top_rank_profile} style={{ bottom: '80px' }}>
              <TopRankUser
                imageUrl={sortedTopList[1].imageUrl}
                name={sortedTopList[1].name}
                cnt={sortedTopList[1].cnt}
              />
            </div>
            <div>2</div>
          </div>
          <div className={`${styles.podium_block} ${styles.podium_1}`}>
            {/* 1위 */}
            <div className={styles.gray_block}></div>
            <div
              className={styles.top_rank_profile}
              style={{ bottom: '110px' }}
            >
              <TopRankUser
                imageUrl={sortedTopList[0].imageUrl}
                name={sortedTopList[0].name}
                cnt={sortedTopList[0].cnt}
              />
            </div>
            <div>1</div>
          </div>
          <div className={`${styles.podium_block} ${styles.podium_3}`}>
            {/* 3위 */}
            <div className={styles.gray_block}></div>
            <div className={styles.top_rank_profile} style={{ bottom: '70px' }}>
              <TopRankUser
                imageUrl={sortedTopList[2].imageUrl}
                name={sortedTopList[2].name}
                cnt={sortedTopList[2].cnt}
              />
            </div>
            <div>3</div>
          </div>
        </div>
      </div>
      <div className={styles.rank_user_container}>
        {sortedRankList.map((item, index) => (
          <div className={styles.rank_user_item} key={item.id}>
            <RankUser
              imageUrl={item.imageUrl}
              name={item.name}
              cnt={item.cnt}
              rank={index + TOP_RANK_COUNT + 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
