import React from "react";
import { useParams } from "react-router-dom";

import { ErrorMessage } from "../../ShimmerUI/ErrorMessage";

import * as styles from "./VideoPlayer.module.scss";

export const VideoPlayer: React.FC = () => {
  const paramData = useParams();
  const trailer_id = paramData?.videoId;

  if (trailer_id == "undefined") {
    return (
      <div className={styles.errorMessage}>
        <ErrorMessage message="Video not found for the Tailer Id" />
      </div>
    );
  }

  return (
    <div className={styles.videoSection}>
      <div className={styles.videoWrapper}>
        <iframe
          src={`https://www.youtube.com/embed/${trailer_id}?autoplay=1&mute=1&showinfo=0&modestbranding=1&loop=1&playlist=${trailer_id}&enablejsapi=1&playsinline=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
