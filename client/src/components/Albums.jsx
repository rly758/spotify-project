import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";
import { getArtistAlbums } from "../spotify";

import styles from "../styles/Albums.module.scss";

function Albums() {
  const [artistAlbums, setArtistAlbums] = useState(null);
  const { artistId } = useParams();

  useEffect(() => {
    let ignore = false;

    async function fetchData(artistId) {
      const artistAlbums = await getArtistAlbums(artistId);
      //console.log(artistAlbums);

      if (!ignore) {
        setArtistAlbums(artistAlbums);
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

  return artistAlbums ? (
    <div className={styles.container}>
      <h2>Albums</h2>
      <div className={styles.albums}>
        {artistAlbums.items.map((album, i) => (
          <div className={styles.album} key={i}>
            <Link to={`/album/${album.id}`}>
              <img src={album.images[1].url}></img>
              <span className={styles.name}>{album.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Albums;
