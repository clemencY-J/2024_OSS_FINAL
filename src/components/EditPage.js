import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlaylist, deleteTrackFromPlaylist } from "../services/PlaylistService";
import "./EditPage.css"; // 스타일 연결

const EditPage = ({ updatePlaylist }) => {
  const [playlist, setPlaylist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylist = async () => {
      const data = await getPlaylist();
      setPlaylist(data);
    };
    fetchPlaylist();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTrackFromPlaylist(id);
      const updatedPlaylist = playlist.filter((track) => track.id !== id);
      setPlaylist(updatedPlaylist);
      updatePlaylist(updatedPlaylist); // App.js에서 관리하는 상태도 업데이트
      alert("Track deleted successfully!");
    } catch (error) {
      console.error("Failed to delete track:", error);
      alert("Failed to delete track. Please try again.");
    }
  };

  return (
    <div className="edit-page">
      <h1>EDIT PAGE</h1>
      <h2>Edit Playlist</h2>
      <ul className="playlist-container">
        {playlist.map((track) => (
          <li key={track.id} className="playlist-item">
            <img src={track.image} alt={track.name} className="album-art" />
            <div className="track-info">
              <h4>{track.name}</h4>
              <p>{track.artist}</p>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(track.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="navigation-buttons">
        <button onClick={() => navigate("/")}>Go to Search Page</button>
        <button onClick={() => navigate("/read")}>Go to Read Page</button>
      </div>
    </div>
  );
};

export default EditPage;
