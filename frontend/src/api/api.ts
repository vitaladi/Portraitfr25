import axios from "axios";

// Définir l'URL de l'API .NET
const API_BASE_URL = "http://localhost:5094/api"; // Assure-toi que c'est bien l'URL du backend

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
