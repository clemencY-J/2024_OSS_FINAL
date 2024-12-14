import React, { useState } from "react";
import { searchTracks } from "../services/SpotifyService";
import { addTrackToPlaylist } from "../services/PlaylistService";
import SearchResults from "./SearchResults";
import "./SearchPage.css";

const SearchPage = ({ updatePlaylist }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tracks, setTracks] = useState([]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a search term.");
      return;
    }

    try {
      const results = await searchTracks(searchTerm);
      setTracks(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
      alert("Failed to fetch search results. Please try again.");
    }
  };

  const handleAddTrack = async (track) => {
    try {
      const trackToAdd = {
        id: track.id,
        name: track.name,
        artist: track.artist,
        album: track.album,
        image: track.image,
        releaseDate: track.releaseDate, // 추가
        duration: track.duration, // 추가
        previewUrl: track.previewUrl, // 필드 이름 통일
      };
  
      // MockAPI로 데이터 전송
      const addedTrack = await addTrackToPlaylist(trackToAdd);
  
      // Playlist 업데이트
      updatePlaylist((prevPlaylist) => [...prevPlaylist, addedTrack]);
  
      alert(`Track "${addedTrack.name}" by ${addedTrack.artist} added to the playlist!`);
    } catch (error) {
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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <SearchResults tracks={tracks} onAdd={handleAddTrack} />
    </div>
  );
};

export default SearchPage;
