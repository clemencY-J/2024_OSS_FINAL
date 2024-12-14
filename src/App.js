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
        setPlaylist(data); // 초기 상태 설정
      } catch (error) {
        console.error("Error loading playlist:", error);
      }
    };
    fetchPlaylist();
  }, []);

  // 업데이트 함수
  const updatePlaylist = (newPlaylist) => {
    setPlaylist(newPlaylist);
  };

  return (
    <Router>
      <div className="app">
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={<SearchPage updatePlaylist={updatePlaylist} />}
            />
            <Route
              path="/read"
              element={<ReadPage updatePlaylist={updatePlaylist} />}
            />
            <Route
              path="/edit"
              element={<EditPage updateSidebar={updatePlaylist} />}
            />
            <Route
              path="/search&add"
              element={<SearchPage updatePlaylist={updatePlaylist} />}
            />
          </Routes>
        </div>
        <Sidebar playlist={playlist} />
      </div>
    </Router>
  );
};

export default App;
