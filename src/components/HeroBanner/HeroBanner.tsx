import React from "react";
import { useBannerData } from "../../hooks/useBannerData";
import { HeroVideo } from "../HeroVideo";
import { ErrorMessage } from "../ShimmerUI/ErrorMessage";
import { LoadingSpinner } from "../ShimmerUI/LoadingSpinner";
import { NoContent } from "../ShimmerUI/NoContent";
import { Link } from "react-router-dom";
import styles from "./HeroBanner.module.scss";

type HeroBannerProps = {
  apiURL: string;
};

export const HeroBanner: React.FC<HeroBannerProps> = ({ apiURL }) => {
  const { movie, video, error, isLoading } = useBannerData(apiURL);
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!video || !movie) return <NoContent />;

  return (
    <div className={styles.heroBanner}>
      <div className={styles.videoWrapper}>
        <HeroVideo videoId={video?.key} />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{movie?.title}</h1>
        <p className={styles.description}>{movie?.overview}</p>
        <div className={styles.buttons}>
          <Link to={`/video/${video.key}`} className={styles.buttonLink}>
            <button className={`${styles.button} ${styles.buttonPlay}`}>
              Play
            </button>
          </Link>
          <button className={`${styles.button} ${styles.buttonInfo}`}>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};