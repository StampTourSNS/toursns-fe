import RankUser from '@/components/rankUserProfile/RankUser';
import TopRankUser from '@/components/topRankUserProfile/TopRankUser';

import styles from './page.module.css';
import rankList from './rankList.json';

export default function StampRank() {
  const sortedRankList = [...rankList.items].sort((a, b) => b.cnt - a.cnt);

  return (
    <div className={styles.stamp_rank_container}>
      <div className={styles.top_rank_user_container}>
        <div className={styles.podium}>
          <div className={`${styles.podium_block} ${styles.podium_2}`}>
            {/* 2위 */}
            <div className={styles.gray_block}></div>
            <div className={styles.top_rank_profile} style={{ bottom: '80px' }}>
              {sortedRankList[1] ? (
                <TopRankUser
                  imageUrl={sortedRankList[1].imageUrl}
                  name={sortedRankList[1].name}
                  cnt={sortedRankList[1].cnt}
                />
              ) : (
                <div className={styles.empty_rank}>-</div>
              )}
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
              {sortedRankList[0] ? (
                <TopRankUser
                  imageUrl={sortedRankList[0].imageUrl}
                  name={sortedRankList[0].name}
                  cnt={sortedRankList[0].cnt}
                />
              ) : (
                <div className={styles.empty_rank}>-</div>
              )}
            </div>
            <div>1</div>
          </div>
          <div className={`${styles.podium_block} ${styles.podium_3}`}>
            {/* 3위 */}
            <div className={styles.gray_block}></div>
            <div className={styles.top_rank_profile} style={{ bottom: '70px' }}>
              {sortedRankList[2] ? (
                <TopRankUser
                  imageUrl={sortedRankList[2].imageUrl}
                  name={sortedRankList[2].name}
                  cnt={sortedRankList[2].cnt}
                />
              ) : (
                <div className={styles.empty_rank}>-</div>
              )}
            </div>
            <div>3</div>
          </div>
        </div>
      </div>
      <div className={styles.rank_user_container}>
        {sortedRankList.map(
          (item, index) =>
            index >= 3 && (
              <div className={styles.rank_user_item} key={item.id}>
                <RankUser
                  imageUrl={item.imageUrl}
                  name={item.name}
                  cnt={item.cnt}
                  rank={index + 1}
                />
              </div>
            ),
        )}
      </div>
    </div>
  );
}
