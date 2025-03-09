import useParticipants from "../hooks/useParticipants";

const Inscription = () => {
  const participantCount = useParticipants();

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white px-6"
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
      <div className="relative z-10 text-center max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-orange-500 mb-6">
          Inscription aux PortraitFr Awards 2025
        </h1>

        {/* Iframe du formulaire Notion */}
        <div className="w-full h-[600px] bg-black rounded-lg overflow-hidden shadow-lg">
          <iframe 
            src="https://vitaladi.notion.site/ebd/1a3dcd06d5ca80aca76cf10a15f18389" 
            width="100%" 
            height="600" 
            frameBorder="0" 
            allowFullScreen
            className="w-full h-full rounded-lg"
          />
        </div>

        {/* Affichage du compteur sous l'iframe 
        <p className="mt-6 text-lg text-orange-400">
          {participantCount !== null ? (
            <>
              <span className="font-bold">{participantCount}</span> participants déjà inscrits !
            </>
          ) : (
            "Chargement du nombre de participants..."
          )}
        </p>
*/}
        {/* Formulaire mis en commentaire */}
        {/*
        <Form />
        */}
      </div>
    </div>
  );
};

export default Inscription;
