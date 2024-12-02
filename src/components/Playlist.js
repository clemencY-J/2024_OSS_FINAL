import React, { useEffect, useState } from "react";
import { getPlaylists, deleteTrackFromPlaylist } from "../PlaylistService";

const Playlist = () => {
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      const data = await getPlaylists();
      setPlaylist(data);
    };
    fetchPlaylist();
  }, []);

  const handleDelete = async (id) => {
    await deleteTrackFromPlaylist(id);
    setPlaylist(playlist.filter((track) => track.id !== id));
  };

  return (
    <div>
      <h1>My Playlist</h1>
      {playlist.map((track) => (
        <div key={track.id}>
          <img src={track.image} alt={track.name} width="50" />
          <div>
            <h4>{track.name}</h4>
            <p>{track.artist}</p>
            <button onClick={() => handleDelete(track.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
