import { useState, useEffect } from "react";
import axios from "axios";

// ✅ Utilisation d'une variable d'environnement pour l'URL de l'API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5095/api";

const useParticipants = () => {
  const [count, setCount] = useState<number | null>(null);

  const fetchParticipantCount = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/participant/count`);
      setCount(response.data.count);
    } catch (error) {
      console.error("⚠️ Erreur lors de la récupération du nombre d'inscrits :", error);
      setCount(0); // ✅ Sécurisation en cas d'erreur
    }
  };

  useEffect(() => {
    fetchParticipantCount();
    const interval = setInterval(fetchParticipantCount, 5000); // 🔄 Mise à jour toutes les 5 secondes
    return () => clearInterval(interval);
  }, []);

  return count;
};

export default useParticipants;
