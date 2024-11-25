import { useState, useEffect } from "react";
import Loading from "./Loading";
import TrackItem from "./TrackItem";

import { getRecentlyPlayed } from "../spotify";

import styles from "../styles/RecentlyPlayed.module.scss";

function RecentlyPlayed() {
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const data = await getRecentlyPlayed();
      //console.log(data);

      if (!ignore) {
        setRecentlyPlayed(data);
      }
    }

    try {
      fetchData();
    } catch (error) {
      //console.log(error);
    }

    return () => {
      ignore = true;
    };
  }, []);

  // note that recentlyPlayed json structure contains an extra level after recentlyPlayed.items before reaching the track data
  // this is different from how the other spotify api endpoints supply track data in their responses
  // target the track property with { track }, noting the curly braces to destructure and target track property from the object
  // an alternative approach is to reference the track data like so:
  // recentlyPlayed.items.map((extraLayer, i) => (<TrackItem track={extraLayer.track}, key = {i}))

  return recentlyPlayed ? (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Recently Played</h2>
      </div>
      <ul>
        {recentlyPlayed.items.map(({ track }, i) => (
          <TrackItem track={track} key={i} />
        ))}
      </ul>
    </div>
  ) : (
    <Loading />
  );
}

export default RecentlyPlayed;
