import React from "react";

import styles from "./ShimmerCard.module.scss";

export const ShimmerCard: React.FC = () => {
  return (
    <div className={styles.shimmerCard}>
      <div className={styles.media} />
      <div className={styles.info}>
        <div className={styles.shimmerTitle} />
        <div className={styles.metadata}>
          <div className={styles.shimmerYear} />
          <div className={styles.shimmerRating} />
        </div>
      </div>
    </div>
  );
};
