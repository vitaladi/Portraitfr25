import { api } from "./api";

// Définition complète du modèle Participant
export interface Participant {
  nom: string;
  instagram: string;
  email: string;
  categorie: string;
  ville: string;
  description?: string;
  photoUrl?: string;
}

// 📌 Fonction d'inscription d'un participant
export const inscrireParticipant = async (formData: FormData) => {
  try {
    const response = await api.post("/participant/inscription", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    console.error("❌ Erreur lors de l'inscription :", error);
    const err = error as any;
    console.log("Logs d'erreur:", err.response?.data);
    throw new Error(error.response?.data?.message || "Erreur inconnue lors de l'inscription");
      
  }
};

// 📌 Fonction pour récupérer le nombre total de participants
export const getNombreParticipants = async (): Promise<number> => {
  try {
    const response = await api.get("/participant/count");
    return response.data.count;
  } catch (error) {
    const err = error as any;
    console.log("Logs d'erreur:", err.response?.data);
    console.error("❌ Erreur lors de la récupération du nombre de participants :", error);
    return 0; // Retourne 0 en cas d'erreur
  }
};

// 📌 Fonction pour récupérer la liste des participants avec pagination et filtre
export const getParticipants = async (
  page: number = 1,
  pageSize: number = 10,
  categorie: string = ""
) => {
  try {
    const response = await api.get("/participant/list", {
      params: { page, pageSize, categorie },
    });
    console.log("Réponse API Backend :", response.data); // 🔍 Debug ici

    return response.data;
  } catch (error) {
    const erreur = error as any;
    console.log("Logs d'erreur:", erreur.response?.data);
    console.error("❌ Erreur lors de la récupération des participants :", error);
    return { totalParticipants: 0, totalPages: 0, participants: [] }; // Retourne des valeurs par défaut
  }
};
