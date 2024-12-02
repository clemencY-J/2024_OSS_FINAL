import React, { useState } from "react";
import { searchTracks } from "./SpotifyService";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);

  const handleSearch = async (query) => {
    const results = await searchTracks(query);
    setTracks(results);
    setFilteredTracks(results); // 초기 상태는 전체 결과
  };

  const handleFilter = ({ genre, year }) => {
    const filtered = tracks.filter((track) => {
      const matchGenre = genre ? track.album.genres?.includes(genre) : true;
      const matchYear = year
        ? new Date(track.album.release_date).getFullYear() >= parseInt(year)
        : true;
      return matchGenre && matchYear;
    });
    setFilteredTracks(filtered);
  };

  return (
    <div>
      <h1>Spotify Playlist Manager</h1>
      <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
      <SearchResults tracks={filteredTracks} onAdd={(track) => console.log(track)} />
    </div>
  );
};

export default App;
