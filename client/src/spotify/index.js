const EXPIRATION_TIME = 60 * 60 * 1000; //1 hour expiration time in milliseconds

let isFetchingToken = false; //this boolean prevents duplicate requests to get the access token or refresh the access token

export async function getAccessToken() {
  let accessToken, timeStamp;

  if (!isFetchingToken) {
    try {
      isFetchingToken = true; //fetch starts

      const body = await fetch("/auth/current_session");
      const response = await body.json();

      accessToken = response.accessToken; //value is current access token or false if it does not exist
      timeStamp = response.timeStamp;

      //if access token exists and is expired, refresh the access token
      if (accessToken && Date.now() - timeStamp >= EXPIRATION_TIME) {
        console.log("Refreshing access token...");
        accessToken = await refreshAccessToken();
      }
    } finally {
      isFetchingToken = false; //fetch is done
    }
  }

  return accessToken;
}

export async function refreshAccessToken() {
  const body = await fetch("/auth/refresh_token");
  const response = await body.json(); //response contains access token and refresh token

  return response.accessToken; //return only the access token
}

/* API calls */

const headers = {
  Authorization: "Bearer" + getAccessToken(),
};

export async function getProfile() {
  const body = await fetch("https://api.spotify.com/v1/me", { headers });
  const response = await body.json();

  return response;
}

export async function getFollowing() {
  const body = await fetch(
    "https://api.spotify.com/v1/me/following?type=artist",
    { headers }
  );
  const response = await body.json();

  return response;
}

export async function getPlaylists() {
  const body = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers,
  });
  const response = await body.json();

  return response;
}

export async function getTopArtistsShort() {
  const body = await fetch(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term",
    { headers }
  );
  const response = await body.json();

  return response;
}

export async function getTopArtistsMedium() {
  const body = await fetch(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term",
    { headers }
  );
  const response = await body.json();

  return response;
}

export async function getTopArtistsLong() {
  const body = await fetch(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term",
    { headers }
  );
  const response = await body.json();

  return response;
}

export async function getTopTracksShort() {
  const body = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term",
    { headers }
  );
  const response = await body.json();

  return response;
}

export async function getTopTracksMedium() {
  const body = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term",
    { headers }
  );
  const response = await body.json();

  return response;
}

export async function getTopTracksLong() {
  const body = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term",
    { headers }
  );
  const response = await body.json();

  return response;
}

export async function getProfileDetails() {
  const [users, followedArtists, playlists, topArtists, topTracks] =
    await Promise.all([
      getProfile(),
      getFollowing(),
      getPlaylists(),
      getTopArtistsLong(),
      getTopTracksLong(),
    ]);

  return { users, followedArtists, playlists, topArtists, topTracks };
}

export async function getRecentlyPlayed() {
  const body = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played",
    { headers }
  );
  const response = await body.json();

  return response;
}

export async function getArtist(artistId) {
  const body = await fetch(
    `https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`,
    { headers }
  );
  const response = await body.json();

  return response;
}

export async function getPlaylist(playlistId) {
  const body = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    { headers }
  );
  const response = await body.json();

  return response;
}

export async function getPlaylistTracks(playlistId) {
  const body = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    { headers }
  );
  const response = await body.json();

  return response;
}

export async function getTrack(trackId) {
  const body = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers,
  });
  const response = await body.json();

  return response;
}
