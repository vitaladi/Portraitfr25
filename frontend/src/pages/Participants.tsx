import ParticipantsList from "../components/ParticipantsList";

const Participants = () => {
  return (
    <div
      className="relative min-h-screen flex flex-col justify-center items-center bg-black text-orange-500"
      style={{
        backgroundImage: "url(/images/img3.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Ajout d'un calque semi-transparent avec flou */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      {/* Contenu principal (doit être au-dessus du flou) */}
      <div className="relative z-10 w-full max-w-4xl p-10 bg-black/70 rounded-lg shadow-lg">
       
        <ParticipantsList />
      </div>
    </div>
  );
};

export default Participants;
