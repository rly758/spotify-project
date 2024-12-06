import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import ArtistTopTracks from "./ArtistTopTracks";
import { getArtist } from "../spotify";
import Albums from "./Albums";

import styles from "../styles/Artist.module.scss";

function Artist() {
  const [artist, setArtist] = useState(null);
  const { artistId } = useParams();

  useEffect(() => {
    let ignore = false;

    async function fetchData(artistId) {
      const artist = await getArtist(artistId);
      //console.log(artist);

      if (!ignore) {
        setArtist(artist);
      }
    }

    try {
      fetchData(artistId);
    } catch (error) {
      console.log(error);
    }

    return () => {
      ignore = true;
    };
  }, []);

  return artist ? (
    <div className={styles.container}>
      <div className={styles.artist}>
        <img src={artist.images[1].url}></img>
        <span className={styles.name}>
          <a href={artist.external_urls.spotify} target="_blank">
            {artist.name}
          </a>
        </span>
        <div className={styles.details}>
          <div className={styles.stat}>
            <span className={styles.number}>
              {artist.followers.total.toLocaleString()}
            </span>
            <span className={styles.label}>Followers</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.number}>
              {artist.genres.length
                ? artist.genres.map(
                    (genre, i) =>
                      genre + (i === artist.genres.length - 1 ? "" : ", ")
                  )
                : "-"}
            </span>
            <span className={styles.label}>Genre</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.number}>{artist.popularity}%</span>
            <span className={styles.label}>Popularity</span>
          </div>
        </div>
        <a
          className={styles.btn}
          href={artist.external_urls.spotify}
          target="_blank"
        >
          Play on Spotify
        </a>
      </div>
      <div className={styles.tracks}>
        <ArtistTopTracks />
      </div>
      <div className={styles.albums}>
        <Albums />
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Artist;
