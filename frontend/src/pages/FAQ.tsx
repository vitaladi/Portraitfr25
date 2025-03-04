import { motion } from "framer-motion";

const faqData = [
  {
    question: "📅 Quand aura lieu la cérémonie des PortraitFr Awards 2025 ?",
    answer: "La cérémonie se tiendra en fin d’année 2025. La date exacte et le lieu seront annoncés prochainement sur nos réseaux sociaux et notre site internet. Restez connectés !",
  },
  {
    question: "📍 Où se déroulera l’événement ?",
    answer: "Le lieu sera communiqué dans les mois à venir. Nous travaillons à organiser une soirée prestigieuse dans un cadre idéal pour célébrer les talents de la photographie.",
  },
  {
    question: "🎭 Qui peut participer aux PortraitFr Awards ?",
    answer: "Le concours est ouvert à tous les passionnés de photographie : Photographes, Modèles, Make-up artists (MUA), Coup de coeur photo de l’année, ainsi que les Studios.",
  },
  {
    question: "🏆 Quelles sont les catégories récompensées ?",
    answer: "Les catégories de cette édition :\n1️⃣ Photographe de l’année 📷\n2️⃣ Modèle de l’année 💃🕺\n3️⃣ Make-up Artist de l’année 💄\n4️⃣ Studio de l'année 🌟\n5️⃣ Photo de l’année 🖼️",
  },
  {
    question: "📝 Comment s’inscrire et candidater ?",
    answer: "Les candidatures ouvriront le 10 avril 2025. Vous pourrez soumettre votre participation via notre formulaire en ligne sur le site officiel.",
  },
  {
    question: "👥 Comment sont sélectionnés les nominés et les gagnants ?",
    answer: "1️⃣ Sélection par les membres de PortraitFr.\n2️⃣ Un jury professionnel désigne 5 nominés par catégorie.\n3️⃣ Le public vote sur Instagram pour élire les gagnants !",
  },
  {
    question: "🗳️ Comment voter pour ses artistes préférés ?",
    answer: "Le vote du public se fera directement sur Instagram et via notre site web. Des sondages seront disponibles pour vous permettre de soutenir vos artistes favoris.",
  },
  {
    question: "🎟️ Est-ce que l’événement est ouvert au public ?",
    answer: "Oui, l’événement sera accessible sur invitation. Certaines places seront mises à disposition du public et des adhérents de l’association PortraitFr.",
  },
  {
    question: "📲 Où suivre l’actualité des PortraitFr Awards 2025 ?",
    answer: "Restez informé en nous suivant sur Instagram et notre site officiel. Toutes les annonces seront postées régulièrement.",
  },
  {
    question: "💌 Comment contacter l’équipe PortraitFr pour des questions ou collaborations ?",
    answer: "Pour toute question ou partenariat, contactez-nous via notre formulaire sur le site ou envoyez un mail à contact@portraitfr.fr.",
  },
];

const FAQ = () => {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white p-10"
      style={{
        backgroundImage: "url(/images/img21.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Effet de flou sur l’arrière-plan */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      {/* Contenu principal */}
      <div className="relative z-10 max-w-4xl bg-black/70 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-orange-500 text-center mb-6">FAQ - PortraitFr Awards 2025</h1>
        <div className="space-y-6">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 bg-gray-800 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold text-orange-400">{item.question}</h2>
              <p className="text-gray-300 mt-2 whitespace-pre-line">{item.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
