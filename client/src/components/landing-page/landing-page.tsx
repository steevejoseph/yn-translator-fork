import video from "../../assets/videos/landing.mp4";
import "./landing-page.css";

const LandingPage = () => {
  return (
    <div className="container">
      <video
        src={video}
        autoPlay
        playsInline
        muted
        className="video-background"
      />
      <div className="centered-text">Tomorrow is now.</div>
    </div>
  );
};

export default LandingPage;
