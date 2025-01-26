import { useState } from "react";
import { Link } from "react-router-dom";

import { useMediaData } from "../../hooks/useMediaData";
import { MediaCard } from "../MediaCard";
import { ErrorMessage } from "../ShimmerUI/ErrorMessage";
import { ShimmerCard } from "../ShimmerUI/ShimmerCard";

import * as styles from "./MediaSlider.module.scss";

type MovieSliderProps = {
  title: string;
  apiURL: string;
};

export const MediaSlider: React.FC<MovieSliderProps> = ({ title, apiURL }) => {
  const { media, error, isLoading } = useMediaData(apiURL);
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  const handleMouseOver = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const mediaCard = target.closest("[data-media-id]");

    if (mediaCard) {
      const mediaId = Number(mediaCard.getAttribute("data-media-id"));
      setHoveredCardId(mediaId);
    }
  };

  const handleMouseLeave = () => {
    setHoveredCardId(null);
  };

  if (error) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.slider}>
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.slider} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => <ShimmerCard key={index} />)
        ) : media?.length ? (
          media.map((mediaItem) => (
            <Link key={mediaItem.id} to={`/video/${mediaItem.trailer_key}`} className={styles.cardLink}>
              <MediaCard {...mediaItem} isHovered={mediaItem.id === hoveredCardId} data-media-id={mediaItem.id} />
            </Link>
          ))
        ) : (
          <div className={styles.emptyWrapper}>
            <p className={styles.emptyMessage}>No media content available</p>
          </div>
        )}
      </div>
    </div>
  );
};
