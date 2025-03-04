import { useState, useEffect } from "react";
import Countdown from "../components/Countdown";
import BackgroundSlider from "../components/BackgroundSlider";
import AnimatedSection from "../components/AnimatedSection";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const [isCountdownOver, setIsCountdownOver] = useState(false);

  useEffect(() => {
    const targetDate = new Date("2025-04-14T00:00:00").getTime();
    const now = new Date().getTime();
    if (now >= targetDate) {
      setIsCountdownOver(true);
    }
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Arrière-plan animé */}
      <BackgroundSlider />

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-10">
        <AnimatedSection>
          <h1 className="text-5xl font-bold text-orange-500">Portrait Fr Award 2025</h1>
          <p className="text-lg text-white-500">
            {isCountdownOver ? "Participe ici" : "Participation dans"}
          </p>
        </AnimatedSection>

        {/* Affichage conditionnel du compte à rebours */}
        {!isCountdownOver && (
          <AnimatedSection>
            <Countdown onEnd={() => setIsCountdownOver(true)} />
          </AnimatedSection>
        )}

        {/* Bouton de navigation centré */}
        <AnimatedSection>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/inscription"
              className="px-10 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600"
            >
              S'inscrire
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>
    </div>
  );
}
