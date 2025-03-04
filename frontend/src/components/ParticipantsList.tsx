import { useEffect, useState } from "react";
import { getParticipants } from "../api/participantApi";
import { motion, AnimatePresence } from "framer-motion";

interface Participant {
  nom: string;
  instagram: string;
  email: string;
  categorie: string;
  ville: string;
  description: string;
  photoUrl: string;
}

const ParticipantsList = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categorie, setCategorie] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const fetchParticipants = async () => {
    setLoading(true);
    try {
      const data = await getParticipants(page, 10, categorie);
      setParticipants(data.participants);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Erreur lors de la récupération des participants :", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchParticipants();
  }, [page, categorie]);

  return (
    <div className="max-w-5xl mx-auto bg-black bg-opacity-75 text-orange-500 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Liste des participants</h1>

      {/* Sélecteur de catégorie */}
      <motion.select
        value={categorie}
        onChange={(e) => {
          setCategorie(e.target.value);
          setPage(1);
        }}
        className="p-3 rounded bg-gray-800 text-white mb-6 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <option value="">Toutes les catégories</option>
        <option value="Photographe">Photographe</option>
        <option value="Modèle">Modèle</option>
        <option value="MUA">MUA</option>
        <option value="Studio">Studio</option>
        <option value="Photo de l'année">Photo de l'année</option>
      </motion.select>

      {loading ? (
        <p className="text-center">Chargement...</p>
      ) : (
        <>
          {participants.length === 0 ? (
            <p className="text-center">Aucun participant trouvé.</p>
          ) : (
            <AnimatePresence>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {participants.map((p, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-900 text-white p-4 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Affichage de l'image avec vérification */}
                    <img
                      src={p.photoUrl ? `http://localhost:5094${p.photoUrl}` : "/images/default-avatar.png"}
                      alt={p.nom}
                      className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer hover:scale-105 transition duration-300"
                      onClick={() => setSelectedPhoto(p.photoUrl ? `http://localhost:5094${p.photoUrl}` : null)}
                      onError={(e) => {
                        e.currentTarget.src = "/images/default-avatar.png"; // Fallback en cas d'erreur
                      }}
                    />
                    
                    {/* Informations du participant */}
                    <h2 className="text-xl font-bold">{p.nom}</h2>
                    <p className="text-sm text-gray-400">@{p.instagram}</p>
                    <p className="text-sm mt-2">{p.ville}</p>
                    <p className="text-sm text-orange-400 font-semibold mt-2">{p.categorie}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}

          {/* Modal d'affichage de la photo en grand */}
          {selectedPhoto && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative bg-black p-6 rounded-lg">
                <img src={selectedPhoto} alt="Participant" className="max-w-[90vw] max-h-[80vh] rounded-lg" />
                <button
                  className="absolute top-2 right-2 text-white text-3xl"
                  onClick={() => setSelectedPhoto(null)}
                >
                  &times;
                </button>
              </div>
            </motion.div>
          )}

          {/* Pagination avec animations */}
          <motion.div
            className="flex justify-center mt-6 space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              className={`px-4 py-2 rounded ${page === 1 ? "bg-gray-600" : "bg-orange-500 hover:bg-orange-600"}`}
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Précédent
            </button>
            <span className="px-4 py-2 bg-gray-800 rounded">{page} / {totalPages}</span>
            <button
              className={`px-4 py-2 rounded ${page === totalPages ? "bg-gray-600" : "bg-orange-500 hover:bg-orange-600"}`}
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Suivant
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default ParticipantsList;
