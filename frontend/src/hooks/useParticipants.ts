import { useState, useEffect } from "react";
import axios from "axios";

const useParticipants = () => {
  const [count, setCount] = useState<number | null>(null);

  const fetchParticipantCount = async () => {
    try {
      const response = await axios.get("http://localhost:5094/api/participant/count");
      setCount(response.data.count);
    } catch (error) {
      console.error("Erreur lors de la récupération du nombre d'inscrits :", error);
      setCount(0); // Si erreur, on met 0 pour éviter un affichage incorrect
    }
  };

  useEffect(() => {
    fetchParticipantCount();
    const interval = setInterval(fetchParticipantCount, 5000); // Mise à jour toutes les 5 secondes
    return () => clearInterval(interval);
  }, []);

  return count;
};

export default useParticipants;
