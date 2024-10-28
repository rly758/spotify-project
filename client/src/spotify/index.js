const EXPIRATION_TIME = 60 * 60 * 1000; //1 hour expiration time in milliseconds

export async function getAccessToken() {
  const body = await fetch("/auth/current_session");
  const response = await body.json();

  let { accessToken, timeStamp } = response;

  //If access token does not exist, accessToken is falsey. returning a falsey valued accessToken will render the Login component.
  //After login and authorization, callback redirects to homepage "/". Then logic flow continues below, where access token exists

  //If access token exists and is expired, refresh the access token

  if (accessToken && Date.now() - timeStamp >= EXPIRATION_TIME) {
    console.log("Refreshing access token...");
    accessToken = await refreshAccessToken();
  }

  return accessToken;
}

export async function refreshAccessToken() {
  const body = await fetch("/auth/refresh_token");
  const response = await body.json(); //response contains access token and refresh token
  console.log("new token: " + response.accessToken);
  return response.accessToken;
}
