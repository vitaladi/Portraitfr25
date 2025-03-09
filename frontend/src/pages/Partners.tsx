import { motion } from "framer-motion";

const partners = [
  { logo: "/images/part-logo1.png", link: "https://www.instagram.com/partner1" },
  /*{ logo: "/images/part-logo2.png", link: "https://www.instagram.com/partner2" },
  { logo: "/images/part-logo3.png", link: "https://www.instagram.com/partner3" },
  { logo: "/images/part-logo4.png", link: "https://www.instagram.com/partner4" },
  { logo: "/images/part-logo5.png", link: "https://www.instagram.com/partner5" },
  { logo: "/images/part-logo6.png", link: "https://www.instagram.com/partner6" },
  { logo: "/images/part-logo7.png", link: "https://www.instagram.com/partner7" },
  { logo: "/images/part-logo8.png", link: "https://www.instagram.com/partner8" },
  { logo: "/images/part-logo9.png", link: "https://www.instagram.com/partner9" },
  { logo: "/images/part-logo10.png", link: "https://www.instagram.com/partner10" },*/
];

const Partners = () => {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white p-10"
      style={{
        backgroundImage: "url(/images/img17.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Effet de flou sur l’arrière-plan */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center max-w-5xl">
        <h1 className="text-4xl font-bold text-orange-500 mb-8">Nos Partenaires</h1>
        <p className="text-lg text-gray-300 mb-12">
          Découvrez nos partenaires, sponsors, ambassadeurs qui soutiennent l'événement PortraitFr Awards 2025.
        </p>
        <p className="text-lg text-gray-300 mb-12">
         Bientôt disponible
        </p>


        {/* Grille des partenaires */}
       {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {partners.map((partner, index) => (
            <motion.a
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 bg-gray-800 rounded-lg shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={partner.logo}
                alt={`Partenaire ${index + 1}`}
                className="h-20 w-auto object-contain"
              />
            </motion.a>
          ))}
        </div>*/}
        
      </div>
    </div>
  );
};

export default Partners;
