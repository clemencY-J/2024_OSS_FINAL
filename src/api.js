import axios from 'axios';

const CLIENT_ID = '357c0850169f419ca90f2f829e8f1705'; // Spotify Client ID
const CLIENT_SECRET = 'fde7b5ac4d6b4c94b08afb01987adee1'; // Spotify Client Secret
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const ALBUM_URL = 'https://api.spotify.com/v1/albums';

export const getAccessToken = async () => {
  const response = await fetch("/api/getToken"); // Serverless Function 호출
  const data = await response.json();
  return data.accessToken;
};


export const getAlbumData = async (albumId, accessToken) => {
  const response = await axios.get(`${ALBUM_URL}/${albumId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

