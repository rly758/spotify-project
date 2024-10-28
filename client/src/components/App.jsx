import { useEffect, useState } from "react";
import "../styles/App.css";
import { getAccessToken } from "../spotify";
import Profile from "./Profile";
import Login from "./Login";

function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    })();
  }, []);

  //initial login flow
  // 1. useEffect() sets the access token to the result of getAccessToken()
  // 1a. access token does not exist => show Login component which redirects to "/" after spotify authorization. Then access token exists. Return access token and Profile is shown.
  // 1b. access token does exist => if access token is expired, renew access token with refresh token => return new access token and show Profile

  return accessToken ? <Profile /> : <Login />;
}

export default App;
