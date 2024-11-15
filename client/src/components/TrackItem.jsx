import styles from "../styles/TrackItem.module.scss";

function TrackItem({ track }) {
  return (
    <li>
      <div className={styles.container}>
        <div className={styles.image}>
          {track.album.images.length && (
            <img src={track.album.images[2].url}></img>
          )}
        </div>
        <div className={styles.details}>
          <div className={styles.left}>
            <span>{track.name ? track.name : ""}</span>
            <div>
              <span>
                {track.artists.length > 0 &&
                  track.artists.map((artist, i) => {
                    return (
                      <>
                        {artist.name}
                        {i === track.artists.length - 1 ? "" : ", "}
                      </>
                    );
                  })}
              </span>
              &nbsp;&middot;&nbsp;
              <span>{track.album.name ? track.album.name : ""}</span>
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
