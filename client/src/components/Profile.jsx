import { useEffect, useState } from "react";
import { getProfileDetails } from "../spotify";
import { getUser } from "../spotify";

import Loading from "./Loading";

import styles from "../styles/Profile.module.scss";

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
            profile picture, followers, following, playlist counts
          </div>
          <div className={styles.bottom}></div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Profile;
