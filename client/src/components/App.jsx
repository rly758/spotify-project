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

  //  App flow on initial start
  //  1. useEffect() sets the access token to the result of getAccessToken()
  // 1a. Access token does not exist => show Login component which redirects to "/" after spotify authorization.
  //     Then access token exists => Return access token => show Profile
  // 1b. Access token does exist => getAccessToken() checks if existing access token is expired.
  //     If expired, renew access token with refresh token => return new access token => show Profile

  return accessToken ? <Profile /> : <Login />;
}

export default App;
