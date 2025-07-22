'use client';

import { useState } from 'react';

import { SearchBar } from './_components/SearchBar';
import { SearchResults } from './_components/SearchResults';
import { useSearch } from './hooks/useSearch';
import styles from './page.module.css';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { searchResults, festivalPostGroups, hasSearched } =
    useSearch(searchQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} />

      <SearchResults
        searchResults={searchResults}
        festivalPostGroups={festivalPostGroups}
        hasSearched={hasSearched}
      />
    </div>
  );
}
