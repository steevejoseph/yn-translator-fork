import { SignedIn, UserButton, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <div className="container">
      <nav className="navbar">
        <Link to="/" className="logo">
          Bridge
        </Link>
        <div className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/contact">Contact</Link>

          <SignedIn>
            <Link to="/chat">Chat</Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </SignedOut>
        </div>
      </nav>{" "}
    </div>
  );
}
