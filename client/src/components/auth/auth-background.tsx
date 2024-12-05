import video from "../../assets/videos/landing.mp4";
import "./auth-background.css";

const AuthBackground = () => {
  return (
    <div className="auth-background">
      <video
        src={video}
        autoPlay
        playsInline
        muted
        loop
        className="auth-video-background"
      />
      <div className="auth-overlay"></div>
    </div>
  );
};

export default AuthBackground;
