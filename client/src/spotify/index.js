const EXPIRATION_TIME = 60 * 60 * 1000; //1 hour expiration time in milliseconds

//let isFetchingToken = false; //this boolean prevents duplicate requests to get the access token or refresh the access token

let isRefreshingToken = false;

//the problem lies with the current implementation of getAccessToken(). Alternatively, the problem is in the implementation of getUser().
//Profile component mounts, dismounts, remounts and this calls useEffect twice.
export async function getAccessToken() {
  let accessToken, timeStamp;

  //console.log("fetching starts");
  //isFetchingToken = true; //fetch starts

  const body = await fetch("/auth/current_session");
  const response = await body.json();

  accessToken = response.accessToken; //value is current access token or false if it does not exist
  timeStamp = response.timeStamp;

  //if access token exists and is expired, refresh the access token
  if (
    !isRefreshingToken &&
    accessToken &&
    Date.now() - timeStamp >= EXPIRATION_TIME
  )
    try {
      {
        isRefreshingToken = true;
        console.log("Refreshing access token...");
        accessToken = await refreshAccessToken();
      }
    } finally {
      //isFetchingToken = false; //fetch is done
      isRefreshingToken = false;
      //console.log("fetching ends");
    }

  return accessToken;
}

export async function refreshAccessToken() {
  const body = await fetch("/auth/refresh_token");
  const response = await body.json(); //response contains access token and refresh token

  return response.accessToken; //return only the access token
}

export async function checkAccessToken() {
  const body = await fetch("/auth/current_session");
  const response = await body.json();

  return response.accessToken ? true : false;
}

async function getOptions() {
  const token = await getAccessToken();

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return options;
}

export async function getUser() {
  const body = await fetch("https://api.spotify.com/v1/me", await getOptions());
  const response = await body.json();
  //console.log(response);
  return response;
}

export async function getFollowing() {
  const body = await fetch(
    "https://api.spotify.com/v1/me/following?type=artist",
    await getOptions()
  );
  const response = await body.json();

  return response;
}

export async function getPlaylists() {
  const body = await fetch(
    "https://api.spotify.com/v1/me/playlists",
    await getOptions()
  );
  const response = await body.json();

  return response;
}

export async function getTopArtistsShort() {
  const body = await fetch(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term",
    await getOptions()
  );
  const response = await body.json();

  return response;
}

export async function getTopArtistsMedium() {
  const body = await fetch(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term",
    await getOptions()
  );
  const response = await body.json();

  return response;
}

export async function getTopArtistsLong() {
  const body = await fetch(
    "https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term",
    await getOptions()
  );
  const response = await body.json();

  return response;
}

export async function getTopTracksShort() {
  const body = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term",
    await getOptions()
  );
  const response = await body.json();

  return response;
}

export async function getTopTracksMedium() {
  const body = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term",
    await getOptions()
  );
  const response = await body.json();

  return response;
}

export async function getTopTracksLong() {
  const body = await fetch(
    "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term",
    await getOptions()
  );
  const response = await body.json();

  return response;
}

export async function getProfileDetails() {
  const [user, followedArtists, playlists, topArtists, topTracks] =
    await Promise.all([
      getUser(),
      getFollowing(),
      getPlaylists(),
      getTopArtistsLong(),
      getTopTracksLong(),
    ]);

  return { user, followedArtists, playlists, topArtists, topTracks };
}

export async function getRecentlyPlayed() {
  const body = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played",
    await getOptions()
  );
  const response = await body.json();

  return response;
}

export async function getArtist(artistId) {
  const body = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}`,
    await getOptions()
  );
  const response = await body.json();

  return response;
}

export async function getPlaylist(playlistId) {
  const body = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    await getOptions()
  );
  const response = await body.json();

  return response;
}

export async function getPlaylistTracks(playlistId) {
  const body = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    await getOptions()
  );
  const response = await body.json();

  return response;
}

export async function getTrack(trackId) {
  const body = await fetch(
    `https://api.spotify.com/v1/tracks/${trackId}`,
    await getOptions()
  );
  const response = await body.json();

  return response;
}
