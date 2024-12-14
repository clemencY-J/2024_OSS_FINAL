import axios from "axios";

const MOCK_API_URL = "https://674d091d54e1fca9290e225f.mockapi.io/Spotify";

export const getPlaylist = async () => {
  try {
    const response = await axios.get(MOCK_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching playlist:", error);
    return [];
  }
};

export const addTrackToPlaylist = async (track) => {
  try {
    const response = await axios.post(MOCK_API_URL, track);
    return response.data;
  } catch (error) {
    console.error("Error adding track:", error);
    throw error;
  }
};

export const deleteTrackFromPlaylist = async (id) => {
  try {
    const response = await axios.delete(`${MOCK_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting track:", error);
    throw error;
  }
};
