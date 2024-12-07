export const getEnvVar = (key: keyof Window["ENV"]) => {
  return window.ENV?.[key] || import.meta.env[key];
};
