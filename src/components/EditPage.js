import React, { useEffect, useState } from "react";
import { getPlaylist, deleteTrackFromPlaylist } from "../services/PlaylistService";
import "./EditPage.css";

const EditPage = ({ updateSidebar }) => {
  const [playlist, setPlaylist] = useState([]);
  const [error, setError] = useState(false); // 에러 상태 관리 추가

  // 초기 플레이리스트 로드
  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const data = await getPlaylist();
        setPlaylist(data); // 로컬 상태 업데이트
        updateSidebar(data); // 사이드바와 동기화
      } catch (error) {
        console.error("Error fetching playlist:", error);
        setError(true); // 에러 상태 업데이트
      }
    };
    fetchPlaylist();
  }, [updateSidebar]);

  // 삭제 버튼 핸들러
  const handleDelete = async (trackId) => {
    try {
      // 곡 삭제 API 호출
      await deleteTrackFromPlaylist(trackId);

      // 상태 업데이트
      const updatedPlaylist = playlist.filter((track) => track.id !== trackId);
      setPlaylist(updatedPlaylist); // 로컬 상태 업데이트
      updateSidebar(updatedPlaylist); // 사이드바 동기화

      alert("Track deleted successfully!"); // 성공 메시지
    } catch (error) {
      console.error("Error deleting track:", error);
      alert("Failed to delete track."); // 실패 메시지
    }
  };

  return (
    <div className="edit-page">
      <h1>Edit Playlist</h1>
      <p>Edit your favorite tracks</p>
      {/* 에러 메시지 표시 */}
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
