import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import ReadPage from "./components/ReadPage";
import EditPage from "./components/EditPage";
import Sidebar from "./components/SideBar";
import { getPlaylist } from "./services/PlaylistService";
import "./App.css";

const App = () => {
  const [playlist, setPlaylist] = useState([]);

  // 초기 플레이리스트 로드
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const data = await getPlaylist();
        setPlaylist(data);
      } catch (error) {
        console.error("Error loading playlist:", error);
      }
    };
    fetchPlaylist();
  }, []);

  return (
    <Router>
      <div className="app">
        {/* 메인 콘텐츠와 사이드바 */}
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={<SearchPage updateSidebar={setPlaylist} />}
            />
            <Route
              path="/read"
              element={<ReadPage updateSidebar={setPlaylist} />}
            />
            <Route
              path="/edit"
              element={<EditPage updateSidebar={setPlaylist} />}
            />
            <Route
              path="/search&add"
              element={<SearchPage updateSidebar={setPlaylist} />}
            />
          </Routes>
        </div>
        <Sidebar playlist={playlist} />
      </div>
    </Router>
  );
};

export default App;
