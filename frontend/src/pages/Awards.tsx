import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";


const Awards = () => {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 text-center"
      style={{
        backgroundImage: "url(/images/img9.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Calque sombre avec effet flou */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

      {/* Contenu principal */}
      <div className="relative z-10 max-w-4xl">
        <motion.h1
          className="text-4xl font-bold text-orange-500 mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          PortraitFr Awards 2025 – Célébrons la photographie !
        </motion.h1>

        <motion.p
          className="text-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Le PortraitFr Awards 2025 est la cérémonie dédiée aux talents de la
          photographie en France. Cet événement met en lumière les artistes qui
          font vibrer l’univers de l’image et récompense leur travail.
        </motion.p>

        <motion.div
          className="bg-gray-900 p-6 rounded-lg shadow-lg text-white mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-xl font-semibold">📅 Date : Fin d’année 2025</p>
          <p className="text-xl font-semibold">📍 Lieu : Paris (Adresse à venir)</p>
        </motion.div>

        {/* Catégories récompensées */}
        <motion.h2
          className="text-2xl font-bold text-orange-400 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          🏆 Les catégories récompensées
        </motion.h2>
        <ul className="text-rg text-center mx-auto max-w-lg space-y-5">
          <li><b className="text-orange-400">🔝 Photographe de l’année</b> – Le et la photographe qui a su capturer l’essence de l’émotion à travers ses œuvres.</li>
          <li> <b className="text-orange-400"> 🔝 Modèle de l’année</b> – Celui et celle qui a marqué l’année par sa présence, son charisme et son engagement artistique.</li>
          <li><b className="text-orange-400"> 🔝 Make-up Artist (MUA) de l’année</b> – L’artiste qui sublime les images par son talent en maquillage et en mise en beauté.</li>
          <li><b className="text-orange-400">🔝 Studio de l’année</b> – Le studio qui a contribué à créer des shootings exceptionnels et à faire briller les artistes.</li>
          <li><b className="text-orange-400">🔝 Photo de l’année</b> – L’image qui a marqué la communauté par son esthétique et son impact visuel.
          </li>
        </ul>

        {/* Comment participer */}
        <motion.h2
          className="text-2xl font-bold text-orange-400 mt-8 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          📝 Comment participer ?
        </motion.h2>
        <p className="text-lg mb-4">
          Candidatures ouvertes du <b>14 avril au 31 août 2025</b>.  
        </p>
        <p className="text-lg mb-4">
        Inscription via <a href="/inscription" className="text-orange-500 underline">le formulaire en ligne</a>.  
        </p>
        <p className="text-lg mb-4">
        Sélection des nominés et vote du public sur Instagram & Site.
        </p>

        {/* Sélection des nominés et gagnants */}
        <motion.h2
          className="text-2xl font-bold text-orange-400 mt-8 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
            👥 Sélection des nominés et gagnants
        </motion.h2>
        <p className="text-lg mb-4">

        Sélection des 10 nominés par catégorie par l’équipe PortraitFr puis des 5 nominés finalistes par un jury professionnel.
        </p>
        <p className="text-lg mb-4">
        Vote du public pour élire les gagnants de chaque catégorie.
        </p>


        {/* Accès et Contact */}
        <motion.h2
          className="text-2xl font-bold text-orange-400 mt-8 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        > 
          🎟️ Accès et Contact
        </motion.h2>
        <p className="text-lg mb-4">
          🎫 Événement sur billetterie avec places réservées aux membres, nominés et partenaires.  
        </p>
        <p className="text-lg mb-4">
          📲 Contactez-nous pour toute question ou collaboration via notre formulaire ou sur  
           <a href="mailto:contact@portraitfr.fr" className="text-orange-500 underline">
             notre adresse mail
            </a>.
        </p>
        <p className="text-lg mb-4">

        📢 Plus de détails bientôt !
        </p>
        {/* Réseaux sociaux et contact */}
        <div className="flex justify-center space-x-6 mt-6">
          <a href="https://www.instagram.com/portrait.fr" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-4xl text-orange-500 hover:text-white transition duration-300" />
          </a>
              
        </div>


      </div>
    </div>
  );
};

export default Awards;
