import { useEffect, useState } from "react";
import { getProfileDetails } from "../spotify";

import TrackItem from "./TrackItem";
import Loading from "./Loading";

import styles from "../styles/Profile.module.scss";
import IconProfile from "../assets/IconProfile";
import { NavLink, Link } from "react-router-dom";

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
        //console.log(user);
        setFollowedArtists(followedArtists);
        //console.log(followedArtists);
        setPlaylists(playlists);
        //console.log(playlists);
        setTopArtists(topArtists);
        //console.log(topArtists);
        setTopTracks(topTracks);
        //console.log(topTracks);
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
            <a href={user.external_urls.spotify} target="_blank">
              <h1 className={styles.username}>{user.display_name}</h1>
            </a>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.number}>{user.followers.total}</span>
                <p>Followers</p>
              </div>
              <div className={styles.stat}>
                <span className={styles.number}>
                  {followedArtists.artists.total}
                </span>
                <p>Following</p>
              </div>
              <div className={styles.stat}>
                <span className={styles.number}>{playlists.total}</span>
                <p>Playlists</p>
              </div>
            </div>
            <a className={styles.logout} href="/auth/logout">
              Logout
            </a>
          </div>
          <div className={styles.bottom}>
            <div className={styles.left}>
              <div className={styles.heading}>
                <h3>Top Artists of All Time</h3>
                <NavLink to="/artists">See More</NavLink>
              </div>
              <div className={styles.list}>
                {topArtists ? (
                  <ul>
                    {topArtists.items.slice(0, 10).map((artist, i) => (
                      <li key={i}>
                        <Link to={`/artist/${artist.id}`}>
                          <div className={styles.artistImage}>
                            <img src={artist.images[2].url}></img>
                          </div>
                        </Link>

                        <div className={styles.artistName}>
                          <Link to={`/artist/${artist.id}`}>
                            <p>{artist.name}</p>
                          </Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Loading />
                )}
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.heading}>
                <h3>Top Tracks of All Time</h3>
                <NavLink to="/tracks">See More</NavLink>
              </div>
              <div className={styles.list}>
                {topTracks ? (
                  <ul>
                    {topTracks.items.slice(0, 10).map((track, i) => (
                      <TrackItem track={track} key={i} />
                    ))}
                  </ul>
                ) : (
                  <Loading />
                )}
              </div>
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
