import styles from "../styles/Login.module.scss";

function Login() {
  return (
    <div className={styles.container}>
      <h1>Spotify Personal Project</h1>
      <a href="/auth/login" className={styles.btn}>
        Login to Spotify
      </a>
    </div>
  );
}

export default Login;
