import { useState, useEffect } from "react";
import Loading from "./Loading";
import TrackItem from "./TrackItem";
import {
  getTopTracksShort,
  getTopTracksMedium,
  getTopTracksLong,
  getUser,
  postNewPlaylist,
  postPlaylistTracks,
} from "../spotify";

import styles from "../styles/TopTracks.module.scss";

function TopTracks() {
  const [topTracks, setTopTracks] = useState(null);
  const [timeRange, setTimeRange] = useState("long");
  const [trackUris, setTrackUris] = useState([]);
  const [user, setUser] = useState(null);

  async function handleClick(userId) {
    let name = "My Top 50 Tracks - ";
    let description = "This playlist was created on ";

    switch (timeRange) {
      case "long":
        name += "All Time";
        break;
      case "medium":
        name += "Last 6 Months";
        break;
      case "short":
        name += "Last 4 Weeks";
        break;
      default:
        console.log("Invalid timeRange");
    }

    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    description += `${date.toLocaleDateString(undefined, options)}`;

    const postNewPlaylistBody = {
      name,
      description,
    };
    const newPlaylist = await postNewPlaylist(userId, postNewPlaylistBody);
    const newPlaylistUrl = newPlaylist.external_urls.spotify;

    const postPlaylistTracksBody = { uris: trackUris };
    const _ = await postPlaylistTracks(newPlaylist.id, postPlaylistTracksBody);
    if (_.snapshot_id) {
      window.open(newPlaylistUrl, "_blank");
    }
  }

  async function setData(range) {
    const data = await apiCalls[range]; //await to handle the *promises* in apiCalls
    //console.log("data: ", data);
    const uris = data.items.map((track) => track.uri);
    //console.log("uris: ", uris);

    setTrackUris(uris);
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
      //console.log("data: ", data);
      const uris = data.items.map((track) => track.uri);
      //console.log("uris: ", uris);
      const user = await getUser();

      if (!ignore) {
        setUser(user);
        setTopTracks(data);
        setTrackUris(uris);
        //console.log(data);
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
        <button
          className={styles.greenBtn}
          onClick={() => handleClick(user.id)}
        >
          Create Playlist
        </button>
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
