import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import TrackItem from "./TrackItem";
import {
  getTopTracksShort,
  getTopTracksMedium,
  getTopTracksLong,
} from "../spotify";

import styles from "../styles/TopTracks.module.scss";

function TopTracks() {
  const [topTracks, setTopTracks] = useState(null);
  const [timeRange, setTimeRange] = useState("long");

  async function setData(range) {
    const data = await apiCalls[range]; //await to handle the *promises* in apiCalls
    console.log(data);

    setTopTracks(data);
    setTimeRange(range);
  }

  // these API calls are stored as *promises* inside of apiCalls
  const apiCalls = {
    long: getTopTracksLong(),
    medium: getTopTracksMedium(),
    short: getTopTracksShort(),
  };

  // call long in useEffect as default. short medium long all at once every render for future range changes. use state to hold selected ("prefetched") topArtists
  // how to handle switching time periods? use state to hold value, with buttons to change the state value

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const data = await getTopTracksLong();

      if (!ignore) {
        setTopTracks(data);
        console.log(data);
      }
    }

    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }

    return () => {
      ignore = true;
    };
  }, []);

  return topTracks ? (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Top Tracks</h2>
        <div className={styles.ranges}>
          <button className={styles.btn} onClick={() => setData("long")}>
            <span className={timeRange === "long" ? styles.active : ""}>
              All Time
            </span>
          </button>
          <button className={styles.btn} onClick={() => setData("medium")}>
            <span className={timeRange === "medium" ? styles.active : ""}>
              Last 6 Months
            </span>
          </button>
          <button className={styles.btn} onClick={() => setData("short")}>
            <span className={timeRange === "short" ? styles.active : ""}>
              Last 4 Weeks
            </span>
          </button>
        </div>
      </div>
      <div className={styles.tracks}>
        <ul>
          {topTracks ? (
            topTracks.items.map((track, i) => (
              <TrackItem track={track} key={i} />
            ))
          ) : (
            <Loading />
          )}
        </ul>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default TopTracks;
