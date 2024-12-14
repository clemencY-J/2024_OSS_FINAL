import axios from "axios";

const MOCK_API_URL = "https://674d091d54e1fca9290e225f.mockapi.io/Spotify";

export const getPlaylists = async () => {
  const response = await axios.get(MOCK_API_URL);
  return response.data;
};

export const addTrackToPlaylist = async (track) => {
  const response = await axios.post(MOCK_API_URL, track);
  return response.data;
};

export const deleteTrackFromPlaylist = async (id) => {
  const response = await axios.delete(`${MOCK_API_URL}/${id}`);
  return response.data;
};
