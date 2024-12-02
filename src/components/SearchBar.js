import React, { useState } from "react";
import "../App.css"; // CSS 파일을 import

const SearchBar = ({ onSearch, onFilter }) => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleFilterChange = () => {
    onFilter({ genre, year });
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a song..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">All Genres</option>
        <option value="pop">Pop</option>
        <option value="rock">Rock</option>
        <option value="hip-hop">Hip-Hop</option>
        <option value="jazz">Jazz</option>
      </select>
      <input
        type="number"
        placeholder="Year (e.g., 2020)"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
};

export default SearchBar;
