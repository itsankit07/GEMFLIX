import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "../components/Authentication";
import { VideoPlayer } from "../components/common/VideoPlayer";
import { MainLayout } from "../layouts/MainLayout";
import { Login } from "../pages/Login/Login";
import Bollywood from "../pages/Main/Bollywood";
import { Browse } from "../pages/Main/Browse";
import { TVShows } from "../pages/Main/TVShows";
import { GeminiSearch } from "../pages/GeminiSearch/GeminiSearch";

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/search" element={<GeminiSearch />} />
            <Route path="/tvShows" element={<TVShows />} />
            <Route path="/bollywood" element={<Bollywood />} />
            <Route path="/video/:videoId" element={<VideoPlayer />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};
