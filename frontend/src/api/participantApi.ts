import { api } from "./api";

// Définir le type des données attendues
export interface Participant {
  nom: string;
  instagram: string;
  email: string;
  categorie: string;
}

// Fonction pour envoyer une inscription au backend
export const inscrireParticipant = async (participant: Participant) => {
  try {
    const response = await api.post("/participant/inscription", participant);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erreur lors de l'inscription");
  }
};

// Fonction pour récupérer le nombre total d'inscrits
export const getNombreParticipants = async () => {
  try {
    const response = await api.get("/participant/count");
    return response.data.count;
  } catch (error) {
    return 0;
  }
};


// Fonction pour récupérer la liste paginée des participants avec filtrage
export const getParticipants = async (page: number = 1, pageSize: number = 10, categorie: string = "") => {
  try {
    const response = await api.get("/participant/list", {
      params: { page, pageSize, categorie },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des participants :", error);
    return { totalParticipants: 0, totalPages: 0, participants: [] };
  }
};
