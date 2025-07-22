import Image from 'next/image';
import Link from 'next/link';

import { Info, User } from 'lucide-react';

import { ROUTES } from '@/constants/routes';

import { Post, SearchResult } from '../types';

import styles from './SearchResults.module.css';

// 축제별 게시글 그룹화 타입
interface FestivalPostGroup {
  festivalId: number;
  festivalName: string;
  festivalImage: string;
  postCount: number;
  posts: Post[];
}

interface SearchResultsProps {
  searchResults: SearchResult[];
  festivalPostGroups: FestivalPostGroup[];
  hasSearched: boolean;
}

export const SearchResults = ({
  searchResults,
  festivalPostGroups,
  hasSearched,
}: SearchResultsProps) => {
  const hasNoResults =
    hasSearched &&
    searchResults.length === 0 &&
    festivalPostGroups.length === 0;

  if (hasNoResults) {
    return (
      <div className={styles.noResults}>
        <p>검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.searchResultContainer}>
      {/* 축제 및 사용자 검색 결과 */}
      {searchResults.map((result) =>
        result.type === 'festival' ? (
          <FestivalResult key={`${result.type}-${result.id}`} result={result} />
        ) : (
          <UserResult key={`${result.type}-${result.id}`} result={result} />
        ),
      )}

      {/* 축제별 게시글 그룹 */}
      {festivalPostGroups.map((group) => (
        <FestivalPostGroup
          key={`festival-posts-${group.festivalId}`}
          group={group}
        />
      ))}
    </div>
  );
};

// 축제 검색 결과 컴포넌트
const FestivalResult = ({ result }: { result: SearchResult }) => (
  <Link
    href={ROUTES.FESTIVAL_DETAIL(String(result.id))}
    className={styles.searchResultItem}
  >
    <div className={styles.searchResultItemImage}>
      {result.image ? (
        <Image
          src={result.image}
          alt={result.title}
          width={62}
          height={62}
          className={styles.searchResultItemImage}
        />
      ) : (
        <div className={styles.searchResultItemImage}>
          <Info size={64} color="#ff6f61" />
        </div>
      )}
    </div>
    <div className={styles.searchResultItemContent}>
      <h3>{result.title}</h3>
      {result.description && <p>{result.description}</p>}
      <span className={styles.searchResultType}>{result.type}</span>
    </div>
  </Link>
);

// 사용자 검색 결과 컴포넌트
const UserResult = ({ result }: { result: SearchResult }) => (
  <Link
    href={ROUTES.MYPAGE(String(result.id))}
    className={styles.searchResultItem}
  >
    {result.image ? (
      <Image
        src={result.image}
        alt={result.title}
        width={62}
        height={62}
        className={styles.searchResultItemImage}
      />
    ) : (
      <div className={styles.searchResultItemImage}>
        <User size={62} color="#ff6f61" />
      </div>
    )}

    <div className={styles.searchResultItemContent}>
      <h3>{result.title}</h3>
      <span className={styles.searchResultType}>{result.type}</span>
    </div>
  </Link>
);

// 축제별 게시글 그룹 컴포넌트
const FestivalPostGroup = ({ group }: { group: FestivalPostGroup }) => (
  <Link
    href={ROUTES.FEED(String(group.festivalId))}
    className={styles.festivalPostGroup}
  >
    <div className={styles.festivalPostGroupCount}>{group.postCount}</div>
    <div className={styles.festivalPostGroupInfo}>
      <h3>{group.festivalName}</h3>
      <span className={styles.searchResultType}>post</span>
    </div>
  </Link>
);
