import video from "../../assets/videos/landing.mp4";
import styles from "./landing-page.module.css";

const LandingPage = () => {
  return (
    <div className={styles.landingContainer}>
      <video
        src={video}
        autoPlay
        playsInline
        muted
        loop
        className={styles.videoBackground}
      />
      <div className={styles.centeredText}>Tomorrow is now.</div>
    </div>
  );
};

export default LandingPage;
