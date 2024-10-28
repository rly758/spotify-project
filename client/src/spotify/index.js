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

  return response.accessToken;
}
