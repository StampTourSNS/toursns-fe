import { useState } from 'react';

import { Search } from 'lucide-react';

import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchInputContainer} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit" className={styles.searchButton}>
          <Search size={32} />
        </button>
      </form>
    </div>
  );
};
