import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import { getTrack } from "../spotify";

import styles from "../styles/Track.module.scss";

function Track() {
  const [track, setTrack] = useState(null);
  const { trackId } = useParams();

  useEffect(() => {
    let ignore = false;

    async function fetchData(trackId) {
      const track = await getTrack(trackId);
      console.log(track);

      if (!ignore) {
        setTrack(track);
      }
    }

    try {
      fetchData(trackId);
    } catch (error) {
      console.log(error);
    }

    return () => {
      ignore = true;
    };
  }, []);

  return track ? (
    <div className={styles.container}>
      <div className={styles.track}>
        <div className={styles.left}>
          <img src={track.album.images[1].url}></img>
        </div>
        <div className={styles.right}>
          <h1 className={styles.name}>{track.name}</h1>
          <span className={styles.artists}>
            {track.artists.map(
              (artist, i) =>
                artist.name + (i === track.artists.length - 1 ? "" : ", ")
            )}
          </span>
          <Link to={`/album/${track.album.id}`}>
            <span className={styles.album}>
              {track.album.name} &middot; {getYear(track.album.release_date)}
            </span>
          </Link>
          <a
            href={track.external_urls.spotify}
            target="_blank"
            className={styles.btn}
          >
            Play on Spotify
          </a>
        </div>
      </div>
      <div className={styles.features}>
        <div className={styles.feature}>
          <span className={styles.value}>
            {formatMinuteSeconds(track.duration_ms)}
          </span>
          <span className={styles.label}>Duration</span>
        </div>
        <div className={styles.feature}>
          <span className={styles.value}>{track.popularity}%</span>
          <span className={styles.label}>Popularity</span>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Track;

function getYear(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();

  return year;
}

function formatMinuteSeconds(milliseconds) {
  const minutes = Math.floor(milliseconds / (60 * 1000));
  const seconds = Math.floor(milliseconds / 1000) % 60;

  const formatted = `${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;

  return formatted;
}
