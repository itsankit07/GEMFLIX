import { HeroBanner } from "../../components/HeroBanner";
import { MediaSlider } from "../../components/MediaSlider";
import { MEDIA_ENDPOINTS } from "../../types/mediaEndpoints";

const Bollywood = () => {
  return (
    <div>
      <HeroBanner apiURL={MEDIA_ENDPOINTS.movie.bollywood} />
      <div style={{ backgroundColor: "black" }}>
        <div style={{ marginTop: "-150px", position: "relative", zIndex: "10000" }}>
          <MediaSlider title="Now Playing" apiURL={MEDIA_ENDPOINTS.movie.nowPlaying} />
          <MediaSlider title="Bollywood" apiURL={MEDIA_ENDPOINTS.movie.bollywood} />
          <MediaSlider title="Top Rated" apiURL={MEDIA_ENDPOINTS.movie.topRated} />
          <MediaSlider title="Animation" apiURL={MEDIA_ENDPOINTS.movie.animation} />
        </div>
      </div>
    </div>
  );
};

export default Bollywood;
