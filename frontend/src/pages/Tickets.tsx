import { motion } from "framer-motion";

const Tickets = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-black text-white"
      style={{
        backgroundImage: "url(/images/img11.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Effet de flou sur l’arrière-plan */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      {/* Contenu principal */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-orange-500">
          Bientôt disponible
        </h1>
      </motion.div>
    </div>
  );
};

export default Tickets;
