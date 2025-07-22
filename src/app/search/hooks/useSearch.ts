import { useEffect, useState } from 'react';

import data from '../data.json';
import { Festival, Post, SearchResult, Users } from '../types';

// 축제별 게시글 그룹화 타입
interface FestivalPostGroup {
  festivalId: number;
  festivalName: string;
  festivalImage: string;
  postCount: number;
  posts: Post[];
}

export const useSearch = (searchQuery: string) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [festivalPostGroups, setFestivalPostGroups] = useState<
    FestivalPostGroup[]
  >([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setFestivalPostGroups([]);
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    performSearch(searchQuery);
  }, [searchQuery]);

  const performSearch = (query: string) => {
    const results: SearchResult[] = [];
    const festivalGroups: Map<number, FestivalPostGroup> = new Map();

    // 축제 검색
    data.festivals.forEach((festival: Festival) => {
      if (festival.name.includes(query)) {
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
      if (user.name.toLowerCase().includes(query.toLowerCase())) {
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
      .filter((festival: Festival) => festival.name.includes(query))
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

  return {
    searchResults,
    festivalPostGroups,
    hasSearched,
  };
};
