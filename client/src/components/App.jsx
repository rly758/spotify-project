import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../styles/App.css";
import { getAccessToken } from "../spotify";
import Root from "./Root";
import Login from "./Login";
import ErrorPage from "./ErrorPage";
import Index from "./Index";
import Element1 from "./Element1";
import Element2 from "./Element2";

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
            element: <Index />,
          },
          {
            path: "/element1",
            element: <Element1 />,
          },
          {
            path: "/element2",
            element: <Element2 />,
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
