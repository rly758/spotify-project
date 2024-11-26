import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import IconTrack from "../assets/IconTrack";
import TrackItem from "./TrackItem";
import { getPlaylist } from "../spotify";

import styles from "../styles/Playlist.module.scss";

function Playlist() {
  const [playlist, setPlaylist] = useState(null);
  const { playlistId } = useParams();

  useEffect(() => {
    let ignore = false;

    async function fetchData(trackId) {
      const playlist = await getPlaylist(playlistId);
      console.log(playlist);

      if (!ignore) {
        setPlaylist(playlist);
      }
    }

    try {
      fetchData(playlistId);
    } catch (error) {
      console.log(error);
    }

    return () => {
      ignore = true;
    };
  }, []);

  return playlist ? (
    <div className={styles.container}>
      <div className={styles.left}>
        {playlist.images ? (
          <img src={playlist.images[0].url}></img>
        ) : (
          <div className={styles.defaultImage}>
            <IconTrack />
          </div>
        )}

        <a href={playlist.external_urls.spotify} target="_blank">
          <h2 className={styles.name}>{playlist.name}</h2>
        </a>
        <span className={styles.owner}>By {playlist.owner.display_name}</span>
        <span className={styles.total}>{playlist.tracks.total} Tracks</span>
        <p className={styles.description}>{playlist.description}</p>
      </div>

      <div className={styles.right}>
        <ul>
          {playlist.tracks.items.map(({ track }, i) => (
            <TrackItem track={track} key={i} />
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Playlist;
