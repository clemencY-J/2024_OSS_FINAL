import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SideBar.css"; // 스타일 연결

const Sidebar = ({ playlist }) => {
  const navigate = useNavigate();
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);

  // 플레이리스트 열림/닫힘 핸들러
  const handleMyPlaylistClick = () => {
    setIsPlaylistOpen((prevState) => !prevState);
    navigate("/read");
  };

  // 상태 관리
  const [isEditing, setIsEditing] = useState(false); // 프로필 수정 창 표시 여부
  const [profileName, setProfileName] = useState("Leeyunji"); // 프로필 이름
  const [profileEmoji, setProfileEmoji] = useState("👩🏻‍🦰"); // 프로필 이모지

  // 프로필 저장 핸들러
  const handleSaveProfile = () => {
    const nameInput = document.getElementById("profile-name-input").value.trim();
    const emojiSelect = document.getElementById("profile-emoji-select").value;

    if (nameInput) {
      setProfileName(nameInput);
    }
    setProfileEmoji(emojiSelect);

    // 수정 창 닫기
    setIsEditing(false);
  };

  return (
    <div className="rightside-menu">
      {/* 아바타 영역 */}
      <div className="avatar">
        <div className="icon">
          <p id="profile-emoji">{profileEmoji}</p>
        </div>
        <p id="profile-name">{profileName}</p>
        <button
          id="edit-profile-btn"
          className="edit-btn"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          ⚙️
        </button>
        {isEditing && (
          <div id="profile-edit-container" className="profile-edit-container">
            <label htmlFor="profile-emoji-select">Choose Emoji:</label>
            <select
              id="profile-emoji-select"
              className="scrollable-emoji"
              defaultValue={profileEmoji}
            >
              <optgroup label="Female">
                <option value="👩🏻‍🦰">👩🏻‍🦰</option>
                <option value="👩🏻">👩🏻</option>
                <option value="👩🏻‍🦱">👩🏻‍🦱</option>
                <option value="👩🏻‍🦳">👩🏻‍🦳</option>
                <option value="👩🏻‍🦲">👩🏻‍🦲</option>
              </optgroup>
              <optgroup label="Male">
                <option value="🧑🏻">🧑🏻</option>
                <option value="👱🏻">👱🏻</option>
                <option value="🧔🏻">🧔🏻</option>
                <option value="🧑🏻‍🦱">🧑🏻‍🦱</option>
                <option value="👨🏻‍🦰">👨🏻‍🦰</option>
                <option value="👨🏻‍🦱">👨🏻‍🦱</option>
                <option value="👨🏻‍🦳">👨🏻‍🦳</option>
                <option value="👨🏻‍🦲">👨🏻‍🦲</option>
              </optgroup>
              <optgroup label="Jobs">
                <option value="🧑‍🍳">🧑‍🍳</option>
                <option value="👨‍🎨">👨‍🎨</option>
                <option value="👩‍🎨">👩‍🎨</option>
                <option value="🧑‍🔬">🧑‍🔬</option>
                <option value="👮🏻‍♀️">👮🏻‍♀️</option>
                <option value="👩🏻‍⚕️">👩🏻‍⚕️</option>
                <option value="👩🏻‍💻">👩🏻‍💻</option>
              </optgroup>
            </select>
            <label htmlFor="profile-name-input">Enter Name:</label>
            <input
              id="profile-name-input"
              type="text"
              placeholder="Enter new name"
              defaultValue={profileName}
            />
            <button
              id="save-profile-btn"
              className="save-btn"
              onClick={handleSaveProfile}
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* 메뉴 영역 */}
      <nav className="menu">
        <ul>
          {/* 홈 메뉴 */}
          <li className="menu-item active" onClick={() => navigate("/")}>
            🏠 Home
          </li>
          {/* 마이 플레이리스트 */}
        <li className="menu-item" onClick={handleMyPlaylistClick}>
          🎵 My Playlist
          <ul id="playlist-folder" className={`playlist-folder ${isPlaylistOpen ? "open" : ""}`}>
            {playlist.map((track) => (
              <li key={track.id} className="playlist-item">
                {track.name} - {track.artist}
              </li>
            ))}
          </ul>
        </li>
        {/* Search & Add */}
        <li
                  className="menu-item"
                  onClick={() => navigate("/Search&add")} // Search & Add 클릭 시 /search&add 경로로 이동
                >
                  🔎 Search & ➕ Add
                </li>
          {/* 플레이리스트 수정 */}
          <li
            className="menu-item"
            onClick={() => navigate("/edit")}
          >
            ✏️ Edit
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
