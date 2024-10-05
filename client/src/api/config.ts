export const config = {
  PROTOCOL: import.meta.env.VITE_API_PROTOCOL || window.location.protocol,
  WS_PROTOCOL:
    import.meta.env.VITE_API_WS_PROTOCOL || window.location.protocol === "https"
      ? "wss"
      : "ws",
  BACKEND: import.meta.env.VITE_API_HOSTNAME || window.location.hostname,
  PORT: import.meta.env.VITE_API_PORT || window.location.port,
  WS_PORT: import.meta.env.VITE_API_WS_PORT || window.location.port,
  BASEURL: import.meta.env.VITE_API_BASE_URL || "",
};
