import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import TrackItem from "./TrackItem";
import { getArtistTopTracks } from "../spotify";

import styles from "../styles/ArtistTopTracks.module.scss";

function ArtistTopTracks() {
  const [topTracks, setTopTracks] = useState(null);
  const { artistId } = useParams();

  useEffect(() => {
    let ignore = false;

    async function fetchData(artistId) {
      const topTracks = await getArtistTopTracks(artistId);
      //console.log(topTracks);

      if (!ignore) {
        setTopTracks(topTracks);
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

  return topTracks ? (
    <div className={styles.container}>
      <h2>Top Tracks</h2>
      <div className={styles.tracks}>
        <ul>
          {topTracks.tracks.map((track, i) => (
            <TrackItem track={track} key={i} />
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default ArtistTopTracks;
