import styles from "../styles/TrackItem.module.scss";
import { NavLink } from "react-router-dom";

function TrackItem({ track }) {
  return (
    <li>
      <Link to={`/track/${track.id}`} className={styles.link}>
        <div className={styles.container}>
          <div className={styles.image}>
            {track.album.images.length && (
              <img src={track.album.images[2].url}></img>
            )}
          </div>
          <div className={styles.details}>
            <div className={styles.left}>
              <span className={styles.trackName}>
                {track.name ? track.name : ""}
              </span>
              <div className={styles.artistName}>
                {track.artists.length > 0 &&
                  track.artists.map((artist, i) => {
                    return (
                      <span key={i}>
                        {artist.name}
                        {i === track.artists.length - 1 ? "" : ", "}
                      </span>
                    );
                  })}
                &nbsp;&middot;&nbsp;
                <span>{track.album.name ? track.album.name : ""}</span>
              </div>
            </div>
            <span className={styles.right}>
              {formatMinuteSeconds(track.duration_ms)}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default TrackItem;

function formatMinuteSeconds(milliseconds) {
  const minutes = Math.floor(milliseconds / (60 * 1000));
  const seconds = Math.floor(milliseconds / 1000) % 60;

  const formatted = `${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;

  return formatted;
}
