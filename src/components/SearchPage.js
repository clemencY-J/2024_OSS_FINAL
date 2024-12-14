import React, { useState } from "react";
import { searchTracks } from "../services/SpotifyService";
import SearchResults from "./SearchResults";
import { addTrackToPlaylist, getPlaylist } from "../services/PlaylistService";
import "./SearchPage.css"; // 추가된 CSS 파일 연결

const SearchPage = ({ updateSidebar }) => {
  const [tracks, setTracks] = useState([]);

  const handleSearch = async (query) => {
    const results = await searchTracks(query);
    setTracks(results || []);
  };

  const handleAdd = async (track) => {
    await addTrackToPlaylist({
      id: track.id,
      name: track.name,
      artist: track.artists[0]?.name,
      image: track.album.images[0]?.url,
    });

    // MockAPI에서 다시 데이터를 불러와 Sidebar 업데이트
    const updatedPlaylist = await getPlaylist();
    updateSidebar(updatedPlaylist);
    alert(`${track.name} added to playlist!`);
  };

  return (
    <div className="search-page">
      <h1>Search for Songs</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a song..."
          onKeyDown={(e) => e.key === "Enter" && handleSearch(e.target.value)}
        />
      </div>
      <SearchResults tracks={tracks} onAdd={handleAdd} />
    </div>
  );
};

export default SearchPage;
