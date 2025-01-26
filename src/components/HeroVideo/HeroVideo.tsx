import React from "react";

import * as styles from "./HeroVideo.module.scss";

type HeroVideoProps = {
  videoId?: string;
};

export const HeroVideo: React.FC<HeroVideoProps> = ({ videoId }) => {
  const videoURL = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&loop=1&playlist=${videoId}&enablejsapi=1&playsinline=1`;

  return (
    <div className={styles.videoPlayer}>
      <iframe
        className={styles.iframe}
        src={videoURL}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
