import { SearchBar } from "../../components/SearchBar";
import { SearchResults } from "../../components/SearchResults";

import * as styles from "./GeminiSearch.module.scss";

export const GeminiSearch = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>AI Search</h1>
        <p>Discover movies using AI-powered search</p>
        <span className={styles.aiInfo}>Powered by Gemini AI's intelligent search capabilities</span>
      </div>
      <SearchBar />
      <SearchResults />
    </div>
  );
};
