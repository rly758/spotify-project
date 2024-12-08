import styles from "../styles/TrackItem.module.scss";
import { Link } from "react-router-dom";
import React from "react";

function TrackItem({ track }) {
  return (
    <li>
      <div className={styles.container}>
        {track?.album?.images.length && (
          <div className={styles.image}>
            <Link to={`/track/${track.id}`} className={styles.link}>
              <img src={track.album.images[2].url}></img>
            </Link>
          </div>
        )}
        <div className={styles.details}>
          <div className={styles.left}>
            <Link to={`/track/${track.id}`} className={styles.link}>
              <span className={styles.trackName}>
                {track.name ? track.name : ""}
              </span>
            </Link>
            <div>
              {track.artists.length > 0 &&
                track.artists.map((artist, i) => {
                  return (
                    <React.Fragment key={i}>
                      <Link to={`/artist/${track.artists[i].id}`}>
                        <span className={styles.artistName} key={i}>
                          {artist.name}
                        </span>
                      </Link>
                      {i === track.artists.length - 1 ? "" : ", "}
                    </React.Fragment>
                  );
                })}
              {track?.album?.name ? (
                <>
                  &nbsp;&middot;&nbsp;
                  <Link to={`/album/${track.album.id}`}>
                    <span className={styles.albumName}>{track.album.name}</span>
                  </Link>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <span className={styles.right}>
            {formatMinuteSeconds(track.duration_ms)}
          </span>
        </div>
      </div>
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
