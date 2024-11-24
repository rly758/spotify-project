import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Loading from "./Loading";
import {
  getTopArtistsShort,
  getTopArtistsMedium,
  getTopArtistsLong,
} from "../spotify";

import styles from "../styles/TopArtists.module.scss";

function TopArtists() {
  const [topArtists, setTopArtists] = useState(null);
  const [timeRange, setTimeRange] = useState("long");

  async function setData(range) {
    const data = await apiCalls[range]; //await to handle the *promises* in apiCalls
    console.log(data);

    setTopArtists(data);
    setTimeRange(range);
  }

  // these API calls are stored as *promises* inside of apiCalls
  const apiCalls = {
    long: getTopArtistsLong(),
    medium: getTopArtistsMedium(),
    short: getTopArtistsShort(),
  };

  // call long in useEffect as default. short medium long all at once every render for future range changes. use state to hold selected ("prefetched") topArtists
  // how to handle switching time periods? use state to hold value, with buttons to change the state value

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const data = await getTopArtistsLong();

      if (!ignore) {
        setTopArtists(data);
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Top Artists</h2>
        <div className={styles.ranges}>
          <button className={styles.btn} onClick={() => setData("long")}>
            All Time
          </button>
          <button className={styles.btn} onClick={() => setData("medium")}>
            Last 6 Months
          </button>
          <button className={styles.btn} onClick={() => setData("short")}>
            Last 4 Weeks
          </button>
        </div>
      </div>
      <div className={styles.artists}>
        {topArtists ? (
          topArtists.items.map((artist, i) => (
            <div className={styles.artist} key={i}>
              <Link to={`/artist/${artist.id}`}>
                <img src={artist.images[2].url}></img>
                <p>{artist.name}</p>
              </Link>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default TopArtists;
