import { SignedIn, UserButton, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}>
          Bridge
        </Link>
        <div className={styles.navLinks}>
          <Link to="#/about">About</Link>
          <Link to="#/pricing">Pricing</Link>
          <Link to="#/contact">Contact</Link>

          <SignedIn>
            <Link to="/chat">Chat</Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </SignedOut>
        </div>
      </nav>
    </div>
  );
}
