import axios from "axios";

// Spotify API와 관련된 상수 설정
const CLIENT_ID = "357c0850169f419ca90f2f829e8f1705";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const API_ENDPOINT = "https://api.spotify.com/v1";

let accessToken;

// Access Token을 가져오는 함수
const getAccessToken = async () => {
  // 이미 토큰이 있는 경우 재사용
  if (accessToken) return accessToken;

  // URL 해시 값에서 토큰 추출
  const hash = window.location.hash;
  if (hash) {
    const token = hash.split("&")[0].split("=")[1];
    accessToken = token;
    window.location.hash = ""; // 해시 값 제거
    return accessToken;
  }

  // 사용자 인증 URL 생성
  const authURL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=user-read-private%20user-library-read`;
  window.location.href = authURL;
};

// Spotify에서 노래 데이터를 검색하는 함수
export const searchTracks = async (query) => {
  const token = await getAccessToken(); // Access Token 가져오기

  try {
    const response = await axios.get(`${API_ENDPOINT}/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        type: "track",
        limit: 10,
      },
    });

    // API 응답 데이터를 가공하여 필요한 정보만 반환
    return response.data.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0]?.name,
      album: {
        name: track.album.name,
        release_date: track.album.release_date,
        genres: track.album.genres || [], // 장르 정보는 일부 데이터에만 포함
      },
      image: track.album.images[0]?.url,
      preview_url: track.preview_url,
    }));
  } catch (error) {
    console.error("Error fetching tracks:", error.message);
    throw error;
  }
};
