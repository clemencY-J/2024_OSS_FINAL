import axios from "axios";

const CLIENT_ID = "357c0850169f419ca90f2f829e8f1705"; // Spotify Client ID
const CLIENT_SECRET = "fde7b5ac4d6b4c94b08afb01987adee1"; // Spotify Client Secret
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const SEARCH_URL = "https://api.spotify.com/v1/search";

let accessToken = null;

const getAccessToken = async () => {
  if (accessToken) return accessToken;

  const response = await axios.post(
    TOKEN_URL,
    new URLSearchParams({ grant_type: "client_credentials" }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
      },
    }
  );

  accessToken = response.data.access_token;
  return accessToken;
};

export const searchTracks = async (query) => {
  const token = await getAccessToken();
  const response = await axios.get(SEARCH_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: query,
      type: "track",
      limit: 10,
    },
  });

  return response.data.tracks.items;
};
