import axios from "axios";

const MOCK_API_URL = "https://674d091d54e1fca9290e225f.mockapi.io/Spotify";

/**
 * MockAPI에서 플레이리스트 가져오기
 */
export const getPlaylist = async () => {
  const response = await axios.get(MOCK_API_URL);
  return response.data;
};

/**
 * MockAPI에 곡 추가
 */
export const addTrackToPlaylist = async (track) => {
  const response = await axios.post(MOCK_API_URL, track);
  return response.data;
};

/**
 * MockAPI에서 곡 삭제
 */
export const deleteTrackFromPlaylist = async (id) => {
  const response = await axios.delete(`${MOCK_API_URL}/${id}`);
  return response.data;
};
