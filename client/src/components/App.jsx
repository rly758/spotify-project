import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { checkAccessToken } from "../spotify";
import Root from "./Root";
import Login from "./Login";
import ErrorPage from "./ErrorPage";
import Index from "./Index";
import Profile from "./Profile";
import TopArtists from "./TopArtists";
import Artist from "./Artist";
import TopTracks from "./TopTracks";
import Track from "./Track";
import Playlists from "./Playlists";
import Playlist from "./Playlist";
import RecentlyPlayed from "./RecentlyPlayed";

import "../styles/global.scss";
import "../styles/App.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />, // >>thrown<< errors from children are caught here and rendered in the outlet
        children: [
          {
            index: true,
            element: <Index />, //maybe make profile into the index?
          },
          {
            path: "profile",
            element: <Profile />, //user profile info
          },
          {
            path: "artists",
            element: <TopArtists />, //top artists listened to
          },
          {
            path: "artist/:artistId",
            element: <Artist />, //see info about an artist
          },
          {
            path: "tracks",
            element: <TopTracks />, //top tracks listened to
          },
          {
            path: "track/:trackId",
            element: <Track />, //see info about a track
          },
          {
            path: "recent",
            element: <RecentlyPlayed />, //recently played tracks
          },
          {
            path: "playlists",
            element: <Playlists />, //a list of user's playlists
          },
          {
            path: "playlist/:playlistId",
            element: <Playlist />, //see tracks within a playlist
          },
        ],
      },
    ],
  },
]);

const isToken = await checkAccessToken(); //check if access token exist

function App() {
  //  App flow on initial start
  //  1. Check for existing access token.
  // 1a. Access token does not exist => show Login component which redirects to "/" after spotify authorization.
  //     Then access token exists => Return access token => show router
  // 1b. Access token does exist => getAccessToken() checks if existing access token is expired.
  //     If expired, renew access token with refresh token => return new access token => show router

  return (
    <div className="app-container">
      {isToken ? <RouterProvider router={router} /> : <Login />}
    </div>
  );
}

export default App;
