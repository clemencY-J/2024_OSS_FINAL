import React, { useState } from "react";
import "../App.css"; // CSS 파일을 import

const SearchResults = ({ tracks, onAdd }) => {
  const [currentAudio, setCurrentAudio] = useState(null); // 현재 재생 중인 오디오 상태

  const handlePlayPreview = (url) => {
    if (!url) {
      alert("Preview not available.");
      return;
    }

    // 기존 재생 중인 오디오 중지
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }

    // 새로운 오디오 재생
    const audio = new Audio(url);
    audio.play();
    setCurrentAudio(audio);
  };

  const handleStopPreview = () => {
    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }
  };

  return (
    <div className="search-results">
      {tracks.map((track) => (
        <div className="track-card" key={track.id}>
          <img src={track.image} alt={track.name} />
          <h4>{track.name}</h4>
          <p>{track.artist}</p>
          <button onClick={() => onAdd(track)}>Add to Playlist</button>
          <button onClick={() => handlePlayPreview(track.preview_url)}>
            Play Preview
          </button>
          <button onClick={handleStopPreview}>Stop</button>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
