import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlaylist } from "../services/PlaylistService";
import './ReadPage.css';

const ReadPage = () => {
  const [playlist, setPlaylist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylist = async () => {
      const data = await getPlaylist();
      setPlaylist(data);
    };
    fetchPlaylist();
  }, []);

  return (
    <div className="read-page">
      <h1>READ PAGE</h1>
      <h2>Read Playlist</h2>
      <ul>
        {playlist.map((track) => (
          <li key={track.id}>
            <h4>{track.name}</h4>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")}>Go to Search Page</button>
      <button onClick={() => navigate("/edit")}>Go to Edit Page</button>
    </div>
  );
};

export default ReadPage;
