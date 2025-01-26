import React from "react";

import { Media } from "../../types/mediaTypes";

import * as styles from "./MediaCard.module.scss";
import { IMAGE_BASE } from "../../types/mediaEndpoints";

interface MediaCardProps extends Media {
  isHovered?: boolean;
}

export const MediaCard: React.FC<MediaCardProps> = ({ id, title, name, release_date, backdrop_path, vote_average, poster_path, trailer_key, isHovered }) => {
  const imageLink = backdrop_path || poster_path;
  const renderMedia = () => {
    if (isHovered && trailer_key) {
      return (
        <div className={styles.trailer}>
          <iframe
            src={`https://www.youtube.com/embed/${trailer_key}?autoplay=1&controls=0&mute=1&disablekb=1&modestbranding=1&rel=0`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={false}
            style={{ pointerEvents: "none" }}
          />
        </div>
      );
    }
    return (
      <div className={styles.image}>
        <img
          src={`${IMAGE_BASE}${imageLink}`}
          alt={title || "Movie poster"}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "../../../no-media.png"; // Add a fallback image
          }}
        />
      </div>
    );
  };

  return (
    <div className={styles.mediaCard} data-media-id={id}>
      <div className={styles.media}>{renderMedia()}</div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title || name}</h3>
        <div className={styles.metadata}>
          {release_date && <span className={styles.year}>{new Date(release_date).getFullYear()}</span>}
          {vote_average && <span className={styles.rating}>{vote_average.toFixed(1)}</span>}
        </div>
      </div>
    </div>
  );
};
