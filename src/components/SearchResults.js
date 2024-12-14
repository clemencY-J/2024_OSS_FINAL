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
              <img src={track.image} alt={track.name} className="album-image" />
            </div>
            <div className="track-info">
              <h4>{track.name}</h4>
              <p>Artist: {track.artist}</p>
              <p>Album: {track.album}</p>
              <p>Release Date: {track.releaseDate}</p>
              <p>Duration: {(track.duration / 1000).toFixed(2)} seconds</p>
            </div>
            <div className="track-actions">
              <button onClick={() => onAdd(track)} className="add-btn">
                Add
              </button>
              <button
                onClick={() => handlePlayPreview(track.previewUrl)}
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
