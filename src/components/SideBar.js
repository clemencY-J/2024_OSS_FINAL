import React from "react";
import { useNavigate } from "react-router-dom";
import "./SideBar.css"; // 스타일 연결

const Sidebar = ({ playlist }) => {
  const navigate = useNavigate();

  return (
    <div className="rightside-menu">
      {/* 아바타 영역 */}
      <div className="avatar">
        <div className="icon">👩🏻‍🦰</div>
        <p>Leeyunji</p>
        <button className="edit-btn">✏️ Edit</button>
      </div>

      {/* 메뉴 영역 */}
      <nav className="menu">
        <ul>
          {/* 홈 메뉴 */}
          <li className="menu-item active" onClick={() => navigate("/")}>
            🏠 Home
          </li>
          {/* 마이 플레이리스트 */}
          <li
            className="menu-item"
            onClick={() => navigate("/read")} // My Playlist 클릭 시 /read 경로로 이동
          >
            🎵 My Playlist
            <ul id="playlist-folder" className="playlist-folder">
              {playlist.map((track) => (
                <li key={track.id} className="playlist-item">
                  {track.name} - {track.artist}
                </li>
              ))}
            </ul>
          </li>
          {/* 검색 및 추가 */}
          <li
            className="menu-item"
            onClick={() => navigate("/edit")} // Edit 클릭 시 /edit 경로로 이동
          >
            Edit
          </li>
          {/* Search & Add */}
          <li
            className="menu-item"
            onClick={() => navigate("/Search&add")} // Search & Add 클릭 시 / 경로로 이동
          >
            ➕ Search & Add
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
