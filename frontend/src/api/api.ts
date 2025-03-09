import axios from "axios";

// Utilisation de l'URL de l'API depuis les variables d'environnement
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5095/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
