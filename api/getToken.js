import axios from "axios";

export default async function handler(req, res) {
  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

  const TOKEN_URL = "https://accounts.spotify.com/api/token";

  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error("Missing Spotify Client ID or Secret");
    return res.status(500).json({ error: "Missing environment variables" });
  }

  try {
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

    console.log("Access Token Response:", response.data);
    res.status(200).json({ accessToken: response.data.access_token });
  } catch (error) {
    console.error("Error fetching Spotify token:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch access token" });
  }

  console.log("CLIENT_ID:", process.env.SPOTIFY_CLIENT_ID ? "Exists" : "Missing");
console.log("CLIENT_SECRET:", process.env.SPOTIFY_CLIENT_SECRET ? "Exists" : "Missing");

}
