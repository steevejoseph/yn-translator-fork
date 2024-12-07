import video from "../../assets/videos/landing.mp4";
import styles from "./auth-background.module.css";

const AuthBackground = () => {
  return (
    <div className={styles.authBackground}>
      <video
        src={video}
        autoPlay
        playsInline
        muted
        loop
        className={styles.authVideoBackground}
      />
      <div className={styles.authOverlay}></div>
    </div>
  );
};

export default AuthBackground;
