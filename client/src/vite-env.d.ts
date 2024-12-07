/// <reference types="vite/client" />

interface Window {
  ENV: {
    VITE_CLERK_PUBLISHABLE_KEY?: string;
    VITE_YN_KEY?: string;
    [key: string]: string | undefined;
  };
}