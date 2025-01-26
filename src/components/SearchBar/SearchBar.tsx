import React, { useState } from "react";

import { useSearchResults } from "../../hooks/useSearchResults";

import * as styles from "./SearchBar.module.scss";

export const SearchBar: React.FC = () => {
  const [currentSearch, setCurrentSearch] = useState<string>("");
  const { handleSearch } = useSearchResults();

  const handleSubmit = async () => {
    const searchQuery = currentSearch.trim();
    if (searchQuery) {
      await handleSearch(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          value={currentSearch}
          type="text"
          name=""
          id=""
          placeholder="What would you like to watch today?"
          onChange={(e) => setCurrentSearch(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSubmit}>Search</button>
      </div>
    </div>
  );
};
