import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Countdown = ({ onEnd }: { onEnd: () => void }) => {
  const targetDate = new Date("2025-04-14T00:00:00").getTime();

  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      onEnd(); // Appelle la fonction pour notifier que le compte à rebours est terminé
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }, [targetDate, onEnd]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  return (
    <AnimatePresence>
      {timeLeft && (
        <motion.div
          className="flex space-x-6 text-4xl font-bold text-orange-500"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center">
            <span className="block text-[100px] md:text-[120px] font-bold">{timeLeft.days}</span>
            <span className="text-lg md:text-xl text-white">Jours</span>
          </div>
          <div className="text-center">
            <span className="block text-[50px] md:text-[120px] font-bold">{timeLeft.hours}</span>
            <span className="text-lg md:text-xl text-white">Heures</span>
          </div>
          <div className="text-center">
            <span className="block text-[50px] md:text-[120px] font-bold">{timeLeft.minutes}</span>
            <span className="text-lg md:text-xl text-white">Minutes</span>
          </div>
          <div className="text-center">
            <span className="block text-[50px] md:text-[120px] font-bold">{timeLeft.seconds}</span>
            <span className="text-lg md:text-xl text-white">Secondes</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Countdown;
