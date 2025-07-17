'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Info, Search, User } from 'lucide-react';

import { ROUTES } from '@/constants/routes';

import data from './data.json';
import styles from './page.module.css';
import { Festival, Post, SearchResult, Users } from './types';

// 축제별 게시글 그룹화 타입
interface FestivalPostGroup {
  festivalId: number;
  festivalName: string;
  festivalImage: string;
  postCount: number;
  posts: Post[];
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [festivalPostGroups, setFestivalPostGroups] = useState<
    FestivalPostGroup[]
  >([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setSearchResults([]);
      setFestivalPostGroups([]);
      return;
    }

    const results: SearchResult[] = [];
    const festivalGroups: Map<number, FestivalPostGroup> = new Map();

    // 축제 검색
    data.festivals.forEach((festival: Festival) => {
      if (festival.name.includes(searchQuery)) {
        results.push({
          type: 'festival',
          id: festival.id,
          title: festival.name,
          image: festival.image || '',
          description: festival.address,
        });
      }
    });

    // 사용자 검색
    data.users.forEach((user: Users) => {
      if (user.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        results.push({
          type: 'user',
          id: user.id,
          title: user.name,
          image: user.image || '',
          description: user.email,
        });
      }
    });

    // 검색된 축제의 게시글들을 그룹화
    const matchedFestivalIds = data.festivals
      .filter((festival: Festival) => festival.name.includes(searchQuery))
      .map((festival: Festival) => festival.id);

    data.posts.forEach((post: Post) => {
      if (matchedFestivalIds.includes(post.festivalId)) {
        const festival = data.festivals.find((f) => f.id === post.festivalId);
        if (festival) {
          if (!festivalGroups.has(festival.id)) {
            festivalGroups.set(festival.id, {
              festivalId: festival.id,
              festivalName: festival.name,
              festivalImage: festival.image || '',
              postCount: 0,
              posts: [],
            });
          }

          const group = festivalGroups.get(festival.id)!;
          group.postCount++;
          group.posts.push(post);
        }
      }
    });

    setSearchResults(results);
    setFestivalPostGroups(Array.from(festivalGroups.values()));
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <form className={styles.searchInputContainer} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className={styles.searchButton}>
            <Search size={32} />
          </button>
        </form>
      </div>

      <div className={styles.searchResultContainer}>
        {/* 축제 및 사용자 검색 결과 */}
        {searchResults.map((result) =>
          result.type === 'festival' ? (
            <Link
              href={ROUTES.FESTIVAL_DETAIL(String(result.id))}
              className={styles.searchResultItem}
              key={`${result.type}-${result.id}`}
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
          ) : (
            <Link
              href={ROUTES.MYPAGE(String(result.id))}
              className={styles.searchResultItem}
              key={`${result.type}-${result.id}`}
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
          ),
        )}

        {/* 축제별 게시글 그룹 */}
        {festivalPostGroups.map((group) => (
          <div
            className={styles.festivalPostGroup}
            key={`festival-posts-${group.festivalId}`}
          >
            <div className={styles.festivalPostGroupCount}>
              {group.postCount}
            </div>
            <div className={styles.festivalPostGroupInfo}>
              <h3>{group.festivalName}</h3>
              <span className={styles.searchResultType}>post</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
