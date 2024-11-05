import { NavLink } from "react-router-dom";

import "../styles/Nav.scss";

function Nav() {
  return (
    <nav>
      <div>Spotify Icon</div>
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
      <div>GitHub Icon</div>
    </nav>
  );
}

export default Nav;
