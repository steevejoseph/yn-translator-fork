import video from "../../assets/videos/landing.mp4";
import "./landing-page.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <video
        src={video}
        autoPlay
        playsInline
        muted
        loop
        className="video-background"
      />
      <div className="centered-text">Tomorrow is now.</div>
    </div>
  );
};

export default LandingPage;
