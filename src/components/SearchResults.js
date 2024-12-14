import React, { useState } from "react";
import "./SearchResults.css";


const SearchResults = ({ tracks, onAdd }) => {
  const [currentAudio, setCurrentAudio] = useState(null);

  const handlePlayPreview = (url) => {
    if (!url) {
      alert("Preview not available.");
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
      setCurrentAudio(null);
    }

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
      {tracks && tracks.length > 0 ? (
        tracks.map((track) => (
          <div key={track.id} className="track-card">
            <div className="album-art">
              <img
                src={track.album.images[0]?.url}
                alt={track.name}
                className="album-image"
              />
            </div>
            <div className="track-info">
              <h4>{track.name}</h4>
              <p>{track.artists[0]?.name}</p>
            </div>
            <div className="track-actions">
              <button onClick={() => onAdd(track)} className="add-btn">
                Add
              </button>
              <button
                onClick={() => handlePlayPreview(track.preview_url)}
                className="play-btn"
              >
                Play
              </button>
              <button onClick={handleStopPreview} className="stop-btn">
                Stop
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-results">No tracks found. Please search for a song.</p>
      )}
    </div>
  );
};

export default SearchResults;
