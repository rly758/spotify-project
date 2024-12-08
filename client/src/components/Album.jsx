import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TrackItem from "./TrackItem";
import Loading from "./Loading";
import { getAlbum } from "../spotify";

import styles from "../styles/Album.module.scss";

function Album() {
  const [album, setAlbum] = useState(null);
  const { albumId } = useParams();

  useEffect(() => {
    let ignore = false;

    async function fetchData(albumId) {
      const album = await getAlbum(albumId);
      //console.log(album);

      if (!ignore) {
        setAlbum(album);
      }
    }

    try {
      fetchData(albumId);
    } catch (error) {
      console.log(error);
    }

    return () => {
      ignore = true;
    };
  }, []);

  return album ? (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src={album.images[1].url}></img>
        <div className={styles.details}>
          <h2>{album.name}</h2>
          <div className={styles.info}>
            <div className={styles.left}>
              <span className={styles.artists}>
                {album.artists.map((artist, i) => (
                  <span key={i}>
                    <Link to={artist.external_urls.spotify}>{artist.name}</Link>{" "}
                    {i === album.artists.length - 1 ? "" : ", "}
                  </span>
                ))}
                &middot; {getYear(album.release_date)}
              </span>
              <span className={styles.trackInfo}>
                {album.total_tracks} Tracks,{" "}
                {formatDuration(getTotalDurationMS(album.tracks.items))}
              </span>
              <a
                className={styles.btn}
                href={album.external_urls.spotify}
                target="_blank"
              >
                Play on Spotify
              </a>
            </div>
            <div className={styles.right}>
              <div className={styles.popularity}>
                <span className={styles.value}>{album.popularity}%</span>
                <span className={styles.label}>Popularity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tracks}>
        <ul>
          {album.tracks.items.map((track, i) => (
            <TrackItem track={track} key={i} />
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Album;

function getYear(dateStr) {
  const date = new Date(dateStr);
  return date.getFullYear();
}

function getTotalDurationMS(tracks) {
  const durations = tracks.map((track) => track.duration_ms);
  const total = durations.reduce(
    (accumulator, current) => accumulator + current,
    0
  );

  return total;
}

function formatDuration(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);

  const formatted =
    (hours > 0 ? hours + " hr " : "") +
    (minutes > 0 ? minutes + " min " : "") +
    seconds +
    " sec";

  return formatted;
}
