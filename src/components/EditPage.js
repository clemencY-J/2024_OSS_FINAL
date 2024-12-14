import React, { useEffect, useState } from "react";
import { getPlaylist, deleteTrackFromPlaylist } from "../services/PlaylistService";
import Header from "./Header"; // Header 임포트
import "./EditPage.css";

const EditPage = ({ updateSidebar }) => {
  const [playlist, setPlaylist] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const data = await getPlaylist();
        setPlaylist(data);
        updateSidebar(data); // 사이드바와 동기화
      } catch (error) {
        console.error("Error fetching playlist:", error);
        setError(true);
      }
    };
    fetchPlaylist();
  }, [updateSidebar]);

  const handleDelete = async (trackId) => {
    try {
      await deleteTrackFromPlaylist(trackId);

      const updatedPlaylist = playlist.filter((track) => track.id !== trackId);
      setPlaylist(updatedPlaylist);
      updateSidebar(updatedPlaylist);

      alert("Track deleted successfully!");
    } catch (error) {
      console.error("Error deleting track:", error);
      alert("Failed to delete track.");
    }
  };

  return (
    <div className="edit-page">
      <Header /> {/* Header 추가 */}
      <h1>Edit Playlist</h1>
      <p>Edit your favorite tracks</p>
      {error && (
        <p className="error-message">Failed to load playlist. Please try again later.</p>
      )}
      <div className="playlist-container">
        {playlist.map((track) => (
          <div key={track.id} className="playlist-card">
            <div className="track-info">
              <img src={track.image} alt={track.name} className="album-cover" />
              <div>
                <h3>{track.name}</h3>
                <p>{track.artist}</p>
              </div>
            </div>
            <button
              className="delete-btn"
              onClick={() => handleDelete(track.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditPage;
