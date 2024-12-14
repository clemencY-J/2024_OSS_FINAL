import React, { useEffect, useState } from "react";
import { getPlaylist } from "../services/PlaylistService";
import "./ReadPage.css";

const ReadPage = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTracks, setCurrentTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const data = await getPlaylist();
      setPlaylist(data);
      setCurrentTracks(data.slice(0, 3));
    };
    fetchPlaylist();
  }, []);

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % Math.ceil(playlist.length / 3);
    const start = nextIndex * 3;
    const end = start + 3;
    setCurrentTracks(playlist.slice(start, end));
    setCurrentTrackIndex(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex =
      (currentTrackIndex - 1 + Math.ceil(playlist.length / 3)) %
      Math.ceil(playlist.length / 3);
    const start = prevIndex * 3;
    const end = start + 3;
    setCurrentTracks(playlist.slice(start, end));
    setCurrentTrackIndex(prevIndex);
  };

  const handlePlay = (track) => {
    setCurrentPlayingTrack(track);
    const audioPlayer = document.getElementById("audio-player");
    const audioSource = document.getElementById("audio-source");
    if (track?.audioUrl) {
      audioSource.src = track.audioUrl;
      audioPlayer.load();
      audioPlayer.play();
    } else {
      alert("No audio available for this track.");
    }
  };

  return (
    <div className="read-page">
      <header className="header">
        <img src="/img/logo.png" alt="Logo" className="logo" />
      </header>
      <div className="album-art-container">
        {currentTracks.map((track, index) => (
          <div
            key={index}
            className="disk"
            onClick={() => handlePlay(track)}
          >
            <img className="lp-image" src="/img/IMG_lp.PNG" alt="Vinyl" />
            <img
              className="album-image"
              src={track.image}
              alt={track.name}
            />
          </div>
        ))}
      </div>
      <div className="player-container">
        <div className="track-info">
          <h1 id="title">{currentPlayingTrack?.name || "No Title"}</h1>
          <p id="artist">{currentPlayingTrack?.artist || "No Artist"}</p>
        </div>
        <div className="time-info">
          <span id="current-time">0:00</span>
          <input id="progress-bar" type="range" min="0" max="100" defaultValue="0" />
          <span id="total-time">0:00</span>
        </div>
        <div className="controls">
          <button id="prev-btn" className="control-btn" onClick={handlePrevious}>
            <img src="/img/pre_btn.png" alt="Previous" className="control-icon" />
          </button>
          <button id="play-pause-btn" className="control-btn">
            <img
              src="/img/play_btn.png"
              alt="Play"
              className="control-icon"
              id="play-icon"
            />
          </button>
          <button id="next-btn" className="control-btn" onClick={handleNext}>
            <img src="/img/next_btn.png" alt="Next" className="control-icon" />
          </button>
        </div>
      </div>
      <audio id="audio-player">
        <source id="audio-source" src="" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default ReadPage;
