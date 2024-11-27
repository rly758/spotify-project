import styles from "../styles/Loading.module.scss";

function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.bars}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
    </div>
  );
}

export default Loading;
