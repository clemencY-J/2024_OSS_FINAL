import React, { useEffect, useState } from "react";
import { getPlaylist, deleteTrackFromPlaylist } from "../services/PlaylistService";
import Header from "./Header";
import "./EditPage.css";

const EditPage = ({ updateSidebar }) => {
  const [playlist, setPlaylist] = useState([]);
  const [error, setError] = useState(false);

  // MockAPI에서 플레이리스트 데이터를 가져옴
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const data = await getPlaylist();
        setPlaylist(data);
        updateSidebar(data); // Sidebar와 데이터 동기화
      } catch (error) {
        console.error("Error fetching playlist:", error);
        setError(true);
      }
    };
    fetchPlaylist();
  }, [updateSidebar]);

  // 트랙 삭제 핸들러
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
      <Header />
      <h1>Edit Playlist</h1>
      <p>Edit your favorite tracks</p>
      {error && (
        <p className="error-message">Failed to load playlist. Please try again later.</p>
      )}
      <div className="playlist-container">
        {playlist.length > 0 ? (
          playlist.map((track) => (
            <div key={track.id} className="playlist-card">
              <div className="track-info">
                <img src={track.image} alt={track.name} className="album-cover" />
                <div className="track-details">
                  <h3>{track.name}</h3>
                  <p>Artist: {track.artist}</p>
                  <p>Album: {track.album}</p>
                  <p>Release Date: {track.releaseDate}</p>
                  <p>Duration: {(track.duration / 1000).toFixed(2)} seconds</p>
                  {track.previewUrl && (
                    <audio controls src={track.previewUrl}>
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(track.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No tracks found in your playlist. Add some songs to see them here!</p>
        )}
      </div>
    </div>
  );
};

export default EditPage;
