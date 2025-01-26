import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { resetSearch } from "../../store/search/searchResultsSlice";
import { RootState } from "../../store/store";
import { MediaCard } from "../MediaCard";
import { LoadingSpinner } from "../ShimmerUI/LoadingSpinner";

import * as styles from "./SearchResults.module.scss";

export const SearchResults: React.FC = () => {
  const { searchQuery, movies, isLoading, error } = useSelector((state: RootState) => state.searchResults);
  const dispatch = useDispatch();

  return (
    <div className={styles.searchResults}>
      {!isLoading && searchQuery && (
        <div className={styles.searchInfo}>
          <h2 className={styles.title}>{`Search Results for : ${searchQuery}`}</h2>
          <button onClick={() => dispatch(resetSearch())} className={styles.resetButton}>
            <span>✕</span>
          </button>
        </div>
      )}

      {isLoading && (
        <div className={styles.results}>
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
          <p>No movies found for "{searchQuery}". Please try a different search.</p>
        </div>
      )}

      {!isLoading && (
        <div className={styles.movieGrid}>
          {movies.map((movie) => (
            <Link key={movie.id} to={`/video/${movie.trailer_key}`}>
              <MediaCard key={movie.id} {...movie} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
