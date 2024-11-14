import { useEffect, useState } from "react";
import { getProfileDetails } from "../spotify";
import { getUser } from "../spotify";

import Loading from "./Loading";

import styles from "../styles/Profile.module.scss";
import IconProfile from "../assets/IconProfile";

function Profile() {
  const [user, setUser] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchProfile() {
      const { user, followedArtists, playlists, topArtists, topTracks } =
        await getProfileDetails();

      if (!ignore) {
        setUser(user);
        console.log(user);
        setFollowedArtists(followedArtists);
        console.log(followedArtists);
        setPlaylists(playlists);
        console.log(playlists);
        setTopArtists(topArtists);
        console.log(topArtists);
        setTopTracks(topTracks);
        console.log(topTracks);
      }
    }

    try {
      fetchProfile();
    } catch (error) {
      console.log(error);
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className={styles.container}>
      {user ? (
        <>
          <div className={styles.top}>
            <div className={styles.avatar}>
              {user.images[0] ? (
                <img src={user.images[0].url}></img>
              ) : (
                <IconProfile />
              )}
            </div>
            <a
              className={styles.username}
              href={user.external_urls.spotify}
              target="_blank"
            >
              <h1>{user.display_name}</h1>
            </a>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.number}>{user.followers.total}</div>
                <p>Followers</p>
              </div>
              <div className={styles.stat}>
                <div className={styles.number}>
                  {followedArtists.artists.total}
                </div>
                <p>Following</p>
              </div>
              <div className={styles.stat}>
                <div className={styles.number}>{playlists.total}</div>
                <p>Playlists</p>
              </div>
              <a className={styles.logout} href="/auth/logout">
                Logout
              </a>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.left}>
              <div className={styles.heading}>
                <h3>Top Artists of All Time</h3>
                <a>SEE MORE</a>
              </div>
              <div className={styles.trackList}></div>
            </div>
            <div className={styles.right}>
              <div className={styles.heading}>
                <h3>Top Tracks of All Time</h3>
                <a>SEE MORE</a>
              </div>
              <div className={styles.trackList}></div>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Profile;
