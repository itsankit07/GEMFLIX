import { HeroBanner } from "../../components/HeroBanner";
import { MediaSlider } from "../../components/MediaSlider";
import { MEDIA_ENDPOINTS } from "../../types/mediaEndpoints";

export const TVShows = () => {
  return (
    <div>
      <HeroBanner apiURL={MEDIA_ENDPOINTS.tv.hindiShows} />
      <div style={{ backgroundColor: "black" }}>
        <div style={{ marginTop: "-150px", position: "relative", zIndex: "10000" }}>
          <MediaSlider title="Now Playing" apiURL={MEDIA_ENDPOINTS.tv.airToday} />
          <MediaSlider title="Trending Shows" apiURL={MEDIA_ENDPOINTS.tv.hindiShows} />
          <MediaSlider title="Top Rated" apiURL={MEDIA_ENDPOINTS.tv.topRated} />
          <MediaSlider title="Popular" apiURL={MEDIA_ENDPOINTS.tv.popular} />
        </div>
      </div>
    </div>
  );
};
