import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import IconTrack from "../assets/IconTrack";

import { getPlaylists } from "../spotify";

import styles from "../styles/Playlists.module.scss";

function Playlists() {
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const data = await getPlaylists();
      //console.log(data);

      if (!ignore) {
        setPlaylists(data);
      }
    }

    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }

    return () => {
      ignore = true;
    };
  }, []);

  return playlists ? (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Your Playlists</h2>
      </div>
      <div className={styles.playlists}>
        {playlists.items.map((playlist, i) => (
          <div className={styles.playlist} key={i}>
            <Link to={`/playlist/${playlist.id}`}>
              {playlist.images ? (
                <img src={playlist.images[0].url}></img>
              ) : (
                <div className={styles.defaultImage}>
                  <IconTrack />
                </div>
              )}
              <span className={styles.playlistName}>{playlist.name}</span>
            </Link>
            <span className={styles.trackTotal}>
              {playlist.tracks.total} Tracks
            </span>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Playlists;
