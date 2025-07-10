import RankUser from '@/components/rankUserProfile/RankUser';
import TopRankUser from '@/components/topRankUserProfile/TopRankUser';

import styles from './page.module.css';
import rankList from './rankList.json';

export default function StampRank() {
  const sortedRankList = [...rankList.items].sort((a, b) => b.cnt - a.cnt);

  // 상위 3명을 안전하게 접근
  const firstPlace = sortedRankList[0];
  const secondPlace = sortedRankList[1];
  const thirdPlace = sortedRankList[2];

  return (
    <div className={styles.stamp_rank_container}>
      <div className={styles.top_rank_user_container}>
        <div className={styles.podium}>
          <div className={`${styles.podium_block} ${styles.podium_2}`}>
            {/* 2위 */}
            <div className={styles.gray_block}></div>
            <div className={styles.top_rank_profile} style={{ bottom: '80px' }}>
              {secondPlace ? (
                <TopRankUser
                  imageUrl={secondPlace.imageUrl}
                  name={secondPlace.name}
                  cnt={secondPlace.cnt}
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
              {firstPlace ? (
                <TopRankUser
                  imageUrl={firstPlace.imageUrl}
                  name={firstPlace.name}
                  cnt={firstPlace.cnt}
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
              {thirdPlace ? (
                <TopRankUser
                  imageUrl={thirdPlace.imageUrl}
                  name={thirdPlace.name}
                  cnt={thirdPlace.cnt}
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
