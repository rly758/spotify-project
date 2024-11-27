import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import FeatureChart from "./FeatureChart";
import { getTrack, getAudioFeatures, getAudioAnalysis } from "../spotify";

import styles from "../styles/Track.module.scss";

function Track() {
  const [track, setTrack] = useState(null);
  const [features, setFeatures] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const { trackId } = useParams();

  useEffect(() => {
    let ignore = false;

    async function fetchData(trackId) {
      const [track, features, analysis] = await Promise.all([
        getTrack(trackId),
        getAudioFeatures(trackId),
        getAudioAnalysis(trackId),
      ]);
      //console.log(track);
      //console.log(features);
      //console.log(analysis);

      if (!ignore) {
        setTrack(track);
        setFeatures(features);
        setAnalysis(analysis);
      }
    }

    try {
      fetchData(trackId);
    } catch (error) {
      console.log(error);
    }

    return () => {
      ignore = true;
    };
  }, []);

  return track ? (
    <div className={styles.container}>
      <div className={styles.track}>
        <div className={styles.left}>
          <img src={track.album.images[1].url}></img>
        </div>
        <div className={styles.right}>
          <h1 className={styles.name}>{track.name}</h1>
          <span className={styles.artists}>
            {track.artists.map(
              (artist, i) =>
                artist.name + (i === track.artists.length - 1 ? "" : ", ")
            )}
          </span>
          <a href={track.album.external_urls.spotify} target="_blank">
            <span className={styles.album}>
              {track.album.name} &middot; {getYear(track.album.release_date)}
            </span>
          </a>
          <a
            href={track.external_urls.spotify}
            target="_blank"
            className={styles.btn}
          >
            Play on Spotify
          </a>
        </div>
      </div>
      <div className={styles.features}>
        <div className={styles.feature}>
          <span className={styles.value}>
            {formatMinuteSeconds(features.duration_ms)}
          </span>
          <span className={styles.label}>Duration</span>
        </div>
        <div className={styles.feature}>
          <span className={styles.value}>{toPitch(features.key)}</span>
          <span className={styles.label}>Key</span>
        </div>
        <div className={styles.feature}>
          <span className={styles.value}>
            {features.mode === 1 ? "Major" : "Minor"}
          </span>
          <span className={styles.label}>Modality</span>
        </div>
        <div className={styles.feature}>
          <span className={styles.value}>{features.time_signature}</span>
          <span className={styles.label}>Time Signature</span>
        </div>
        <div className={styles.feature}>
          <span className={styles.value}>{Math.round(features.tempo)}</span>
          <span className={styles.label}>Tempo (BPM)</span>
        </div>
        <div className={styles.feature}>
          <span className={styles.value}>{track.popularity}%</span>
          <span className={styles.label}>Popularity</span>
        </div>
        <div className={styles.feature}>
          <span className={styles.value}>{analysis.bars.length}</span>
          <span className={styles.label}>Bars</span>
        </div>
        <div className={styles.feature}>
          <span className={styles.value}>{analysis.beats.length}</span>
          <span className={styles.label}>Beats</span>
        </div>
        <div className={styles.feature}>
          <span className={styles.value}>{analysis.sections.length}</span>
          <span className={styles.label}>Sections</span>
        </div>
        <div className={styles.feature}>
          <span className={styles.value}>{analysis.segments.length}</span>
          <span className={styles.label}>Segments</span>
        </div>
      </div>
      <FeatureChart features={features} type="bar" />
    </div>
  ) : (
    <Loading />
  );
}

export default Track;

function getYear(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();

  return year;
}

function formatMinuteSeconds(milliseconds) {
  const minutes = Math.floor(milliseconds / (60 * 1000));
  const seconds = Math.floor(milliseconds / 1000) % 60;

  const formatted = `${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;

  return formatted;
}

function toPitch(num) {
  let key;

  switch (num) {
    case 0:
      key = "C";
      break;
    case 1:
      key = "D♭";
      break;
    case 2:
      key = "D";
      break;
    case 3:
      key = "E♭";
      break;
    case 4:
      key = "E";
      break;
    case 5:
      key = "F";
      break;
    case 6:
      key = "G♭";
      break;
    case 7:
      key = "G";
      break;
    case 8:
      key = "A♭";
      break;
    case 9:
      key = "A";
      break;
    case 10:
      key = "B♭";
      break;
    case 11:
      key = "B";
      break;
    default:
      return "-";
  }

  return key;
}
