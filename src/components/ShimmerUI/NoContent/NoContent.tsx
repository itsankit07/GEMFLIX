import * as styles from "./NoContent.module.scss";
export const NoContent: React.FC = () => {
  return (
    <div className={styles.noContentContainer}>
      <div className={styles.noContentContent}>
        <svg className={styles.noContentIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <h2 className={styles.noContentTitle}>No Content Available</h2>
        <p className={styles.noContentMessage}>We couldn't find any content to display at the moment.</p>
      </div>
    </div>
  );
};
