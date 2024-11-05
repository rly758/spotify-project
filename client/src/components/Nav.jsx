import { NavLink } from "react-router-dom";

import IconSpotify from "../assets/IconSpotify";
import IconGithub from "../assets/IconGithub";
import IconProfile from "../assets/IconProfile";
import IconMicrophone from "../assets/IconMicrophone";
import IconTrack from "../assets/IconTrack";
import IconRecent from "../assets/IconRecent";
import IconPlaylist from "../assets/IconPlaylist";

import styles from "../styles/Nav.module.scss";

function Nav() {
  return (
    <nav>
      <div className={styles.logo}>
        <NavLink to="/">
          <IconSpotify />
        </NavLink>
      </div>
      <ul>
        <li>
          <NavLink to="/profile">
            <IconProfile />
            <div>Profile</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/artists">
            <IconMicrophone />
            <div>Top Artists</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/tracks">
            <IconTrack />
            <div>Top Tracks</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/recent">
            <IconRecent />
            <div>Recent</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/playlists">
            <IconPlaylist />
            <div>Playlists</div>
          </NavLink>
        </li>
      </ul>
      <div className={styles.github}>
        <a href="https://github.com/rly758/spotify-project" target="_blank">
          <IconGithub />
        </a>
      </div>
    </nav>
  );
}

export default Nav;
