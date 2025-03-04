import Form from "../components/Form";
import useParticipants from "../hooks/useParticipants";

const Inscription = () => {
  const participantCount = useParticipants();

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-black text-white"
      style={{
        backgroundImage: "url(/images/img7.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Ajout d'un calque semi-transparent avec flou */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center">
        <Form />

        {/* Affichage du compteur sous le formulaire */}
        <p className="mt-6 text-lg text-orange-400">
          {participantCount !== null ? (
            <>
              <span className="font-bold">{participantCount}</span> participants déjà inscrits !
            </>
          ) : (
            "Chargement du nombre de participants..."
          )}
        </p>
      </div>
    </div>
  );
};

export default Inscription;
