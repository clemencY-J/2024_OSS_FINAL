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

  useEffect(() => {
    const fetchPlaylist = async () => {
      const data = await getPlaylist();
      setPlaylist(data);
    };
    fetchPlaylist();
  }, []);

  return (
    <Router>
      <div className="app">
        <div className="main-content">
          <Routes>
            <Route path="/" element={<SearchPage updateSidebar={setPlaylist} />} />
            <Route path="/read" element={<ReadPage updateSidebar={setPlaylist} />} />
            <Route
              path="/edit"
              element={<EditPage updatePlaylist={setPlaylist} />} // updatePlaylist 전달
            />
          </Routes>
        </div>
        <Sidebar playlist={playlist} updatePlaylist={setPlaylist} />
      </div>
    </Router>
  );
};

export default App;
