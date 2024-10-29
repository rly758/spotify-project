import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getAccessToken } from "../spotify";
import Root from "./Root";
import Login from "./Login";
import ErrorPage from "./ErrorPage";
import Index from "./Index";
import Profile from "./Profile";
import RecentlyPlayed from "./RecentlyPlayed";
import TopArtists from "./TopArtists";
import TopTracks from "./TopTracks";
import Playlists from "./Playlists";
import Playlist from "./Playlist";

import "../styles/App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />, //maybe make profile into the index?
          },
          {
            path: "/profile",
            element: <Profile />, //user profile info
          },
          {
            path: "/artists",
            element: <TopArtists />, //top artists listened to
          },
          {
            path: "/artist/:artistId",
            element: <Artist />, //see info about an artist
          },
          {
            path: "/tracks",
            element: <TopTracks />, //top tracks listened to
          },
          {
            path: "/track/:trackId",
            element: <Track />, //see info about a track
          },
          {
            path: "/recent",
            element: <RecentlyPlayed />, //recently played tracks
          },
          {
            path: "/playlists",
            element: <Playlists />, //a list of user's playlists
          },
          {
            path: "/playlist/:playlistId",
            element: <Playlist />, //see tracks within a playlist
          },
        ],
      },
    ],
    //
  },
]);

function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    })();
  }, []);

  //  App flow on initial start
  //  1. useEffect() sets the access token to the result of getAccessToken()
  // 1a. Access token does not exist => show Login component which redirects to "/" after spotify authorization.
  //     Then access token exists => Return access token => show router
  // 1b. Access token does exist => getAccessToken() checks if existing access token is expired.
  //     If expired, renew access token with refresh token => return new access token => show router

  return accessToken ? <RouterProvider router={router} /> : <Login />;
}

export default App;
