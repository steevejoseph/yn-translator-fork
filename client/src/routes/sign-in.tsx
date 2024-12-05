import { SignIn } from '@clerk/clerk-react'

export default function SignInPage() {
  return (
    <SignIn
      path="/sign-in"
      routing="path"
      appearance={{
        elements: {
          rootBox: {
            position: "fixed",
            top: "80px", // Adjust based on your navbar height
            right: "20px",
            width: "400px", // Optional: control the width
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            borderRadius: "12px",
          },
        },
      }}
    />
  );
}