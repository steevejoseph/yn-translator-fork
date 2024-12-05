import { SignIn } from '@clerk/clerk-react'
import AuthBackground from "../components/auth/auth-background";

export default function SignInPage() {
  return (
    <>
      <AuthBackground />
      <SignIn
        path="/sign-in"
        routing="path"
        appearance={{
          elements: {
            rootBox: {
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "400px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              borderRadius: "12px",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              zIndex: 2,
            },
          },
        }}
      />
    </>
  );
}