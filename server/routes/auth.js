const express = require("express");
const jwt = require("jsonwebtoken");

//authorization code with pkce flow
//code verifier
const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

const codeVerifier = generateRandomString(64); //necessary later for access token request
const data = new TextEncoder().encode(codeVerifier); //encode string into a Uint8Array

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const router = express.Router();

//request user authorization
router.get("/login", async (req, res) => {
  //hash the code verifier
  const hashed = await crypto.subtle.digest("SHA-256", data);
  //get the code challenge from the hashed code verifier
  const codeChallenge = base64encode(hashed);

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  const scope =
    "user-read-private user-read-recently-played user-top-read user-follow-read playlist-read-private playlist-read-collaborative";

  const params = {
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
  };

  authUrl.search = new URLSearchParams(params).toString();

  res.redirect(authUrl.toString());
});

//request an access token
router.get("/callback", async (req, res) => {
  const { code } = req.query;
  const tokenUrl = "https://accounts.spotify.com/api/token";
  const payload = {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.SPOTIFY_CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      code_verifier: codeVerifier,
    }),
  };

  const body = await fetch(tokenUrl, payload);
  const response = await body.json(); //response contains access token and refresh token

  const sessionJWTObject = {
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    timeStamp: Date.now(),
  };

  req.session.jwt = jwt.sign(sessionJWTObject, process.env.JWT_SECRET_KEY);
  res.redirect("/");
});

//refresh access token
router.get("/refresh_token", async (req, res) => {
  const refreshUrl = "https://accounts.spotify.com/api/token";
  const decodedToken = jwt.verify(req.session.jwt, process.env.JWT_SECRET_KEY);
  const payload = {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: decodedToken.refreshToken,
      client_id: process.env.SPOTIFY_CLIENT_ID,
    }),
  };

  const body = await fetch(refreshUrl, payload); //fetch new access token
  const response = await body.json();

  //create and overwrite old jwt
  const sessionJWTObject = {
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    timeStamp: Date.now(),
  };

  req.session.jwt = jwt.sign(sessionJWTObject, process.env.JWT_SECRET_KEY);

  res.send(response); //send new tokens
});

//verify jwt and send decoded json webtoken
router.get("/current_session", (req, res) => {
  jwt.verify(
    req.session.jwt,
    process.env.JWT_SECRET_KEY,
    (err, decodedToken) => {
      if (err || !decodedToken) {
        res.send(false);
      } else {
        res.send(decodedToken);
      }
    }
  );
});

router.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

module.exports = router;
