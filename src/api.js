import axios from "axios";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const ALBUM_URL = "https://api.spotify.com/v1/albums";

let cachedToken = null;
let tokenExpiry = null;

/**
 * Get Access Token from Spotify API
 */
export const getAccessToken = async () => {
  // 이미 유효한 토큰이 있는 경우 반환
  if (cachedToken && new Date() < tokenExpiry) {
    console.log("Reusing cached token.");
    return cachedToken;
  }

  try {
    // 환경 변수에서 Client ID와 Secret 로드
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

    if (!CLIENT_ID || !CLIENT_SECRET) {
      throw new Error("Missing Spotify Client ID or Secret in environment variables");
    }

    const response = await axios.post(
      TOKEN_URL,
      new URLSearchParams({ grant_type: "client_credentials" }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
        },
      }
    );

    // Access Token 및 만료 시간 캐싱
    cachedToken = response.data.access_token;
    tokenExpiry = new Date(new Date().getTime() + response.data.expires_in * 1000);
    console.log("Access token successfully fetched.");

    return cachedToken;
  } catch (error) {
    console.error("Error fetching access token:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Get Album Data from Spotify API
 * @param {string} albumId - Spotify Album ID
 * @param {string} accessToken - Spotify Access Token
 */
export const getAlbumData = async (albumId, accessToken) => {
  try {
    const response = await axios.get(`${ALBUM_URL}/${albumId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("Album data successfully fetched.");
    return response.data;
  } catch (error) {
    console.error("Error fetching album data:", error.response?.data || error.message);
    throw error;
  }
};
