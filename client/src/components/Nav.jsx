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
      <ul className={styles.navList}>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <IconProfile />
            <div>Profile</div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/artists"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <IconMicrophone />
            <div>Top Artists</div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tracks"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <IconTrack />
            <div>Top Tracks</div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/recent"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <IconRecent />
            <div>Recent</div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/playlists"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
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
