import React, { useState, useEffect, useRef } from 'react';
import { getAccessToken, getAlbumData } from './api'; // API 함수 가져오기
import './App.css'; // 스타일 파일 추가

const App = () => {
  const [albumImage, setAlbumImage] = useState('');
  const [audioSrc, setAudioSrc] = useState(''); // Spotify API에서 가져온 미리보기 URL
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // 초기 볼륨 값 (50%)
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const token = await getAccessToken();
        const albumId = '01dPJcwyht77brL4JQiR8R'; // Replace with a valid Spotify album ID
        const albumData = await getAlbumData(albumId, token);

        if (albumData.images && albumData.images.length > 0) {
          setAlbumImage(albumData.images[0].url); // 앨범 이미지 설정
        }

        if (albumData.tracks.items.length > 0) {
          setAudioSrc(albumData.tracks.items[0].preview_url); // 첫 번째 트랙의 미리보기 URL 설정
        }
      } catch (error) {
        console.error('Error fetching album data:', error);
      }
    };

    fetchAlbum();
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume; // Audio 객체의 볼륨 조절
  };

  // Audio URL 업데이트
  useEffect(() => {
    if (audioSrc) {
      audioRef.current.src = audioSrc;
      audioRef.current.volume = volume;
    }
  }, [audioSrc, volume]);

  return (
    <div className="player-container">
      <div className="album-container">
        {albumImage && <img src={albumImage} alt="Album Cover" className="album-image" />}
      </div>
      <div className="controls-container">
        <button className="play-button" onClick={togglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        />
      </div>
    </div>
  );
};

export default App;
