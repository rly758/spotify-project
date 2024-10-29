import { Outlet, NavLink } from "react-router-dom";

function Root() {
  return (
    <>
      <p>You are logged in. This is the root component. </p>
      <div id="sidebar">
        <nav>
          <ul>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/artists">Top Artists</NavLink>
            </li>
            <li>
              <NavLink to="/tracks">Top Tracks</NavLink>
            </li>
            <li>
              <NavLink to="/recent">Recent</NavLink>
            </li>
            <li>
              <NavLink to="/playlists">Playlists</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div id="outlet">
        <Outlet />
      </div>
    </>
  );
}

export default Root;
