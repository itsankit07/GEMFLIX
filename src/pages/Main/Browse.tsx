import { HeroBanner } from "../../components/HeroBanner";
import { MediaSlider } from "../../components/MediaSlider";
import { MEDIA_ENDPOINTS } from "../../types/mediaEndpoints";

export const Browse = () => {
  return (
    <div>
      <HeroBanner apiURL={MEDIA_ENDPOINTS.movie.nowPlaying} />
      <div style={{ backgroundColor: "black" }}>
        <div style={{ marginTop: "-150px", position: "relative", zIndex: "10000" }}>
          <MediaSlider title="Now Playing" apiURL={MEDIA_ENDPOINTS.movie.nowPlaying}  />
          <MediaSlider title="Top Rated" apiURL={MEDIA_ENDPOINTS.movie.topRated} />
          <MediaSlider title="Upcoming" apiURL={MEDIA_ENDPOINTS.movie.upcoming} />
          <MediaSlider title="TV Shows" apiURL={MEDIA_ENDPOINTS.tv.topRated} />
          <MediaSlider title="Top Rated Shows" apiURL={MEDIA_ENDPOINTS.tv.airToday} />
        </div>
      </div>
    </div>
  );
};
