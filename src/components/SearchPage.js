import React, { useState } from "react";
import { searchTracks } from "../services/SpotifyService";
import { addTrackToPlaylist } from "../services/PlaylistService";
import SearchResults from "./SearchResults";
import "./SearchPage.css";

const SearchPage = ({ updatePlaylist }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tracks, setTracks] = useState([]);

  // 검색 핸들러
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a search term.");
      return;
    }

    try {
      const results = await searchTracks(searchTerm);
      setTracks(results); // 검색 결과 업데이트
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Failed to fetch search results. Please try again.");
    }
  };

  const handleAddTrack = async (track) => {
    try {
      // MockAPI에 새로운 트랙 추가
      const addedTrack = await addTrackToPlaylist({
        name: track.name,
        artist: track.artists[0]?.name,
        image: track.album.images[0]?.url,
        audioUrl: track.preview_url,
      });
  
      // 상태 업데이트
      updatePlaylist((prevPlaylist) => [...prevPlaylist, addedTrack]);
  
      // 성공 알림
      alert(`Track "${addedTrack.name}" by ${addedTrack.artist} added to the playlist!`);
    } catch (error) {
      // 실패 알림
      console.error("Error adding track:", error);
      alert("Failed to add track to the playlist.");
    }
  };
  

  return (
    <div className="search-page">
      <h1>Search Tracks</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter a track or artist name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // 검색어 업데이트
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <SearchResults tracks={tracks} onAdd={handleAddTrack} /> {/* 검색 결과 컴포넌트 */}
    </div>
  );
};

export default SearchPage;
