import React from "react";
import { createRoot } from "react-dom/client";
import "./index.module.css";
import "./globals.css";
// import App from './App.tsx'
// import {ClerkProvider} from "@clerk/clerk-react";

// import React from 'react'
// import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Import the layouts
import RootLayout from "./layouts/root-layout";
import DashboardLayout from "./layouts/dashboard-layout";

// Import the components
import IndexPage from "./routes";
import ContactPage from "./routes/contact";
import SignInPage from "./routes/sign-in";
import SignUpPage from "./routes/sign-up";
import DashboardPage from "./routes/dashboard";
import Chat from "./components/chat";
import { getEnvVar } from "./utils/env";
// import InvoicesPage from './routes/dashboard.invoices'

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <IndexPage /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      { path: "/chat", element: <Chat /> },

      {
        element: <DashboardLayout />,
        path: "dashboard",
        children: [
          { path: "/dashboard", element: <DashboardPage /> },
          // { path: '/dashboard/invoices', element: <InvoicesPage /> },
        ],
      },
    ],
  },
]);

// Import your Publishable Key
const PUBLISHABLE_KEY = getEnvVar("VITE_CLERK_PUBLISHABLE_KEY");

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env.local file");
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
