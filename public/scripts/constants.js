export const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8000" // Local environment
    : "https://massive-eccomerce.onrender.com"; // Production environment
