import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        isScrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/">
          <img src="/images/logo.png" alt="PortraitFr Logo" className="h-12 w-auto" />
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex space-x-6">
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/" className="text-white hover:text-orange-500 transition">Accueil</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/inscription" className="text-white hover:text-orange-500 transition">Inscription</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/participants" className="text-white hover:text-orange-500 transition">Participants</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/partners" className="text-white hover:text-orange-500 transition">Partenaires</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/awards" className="text-white hover:text-orange-500 transition">Awards</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/tickets" className="text-white hover:text-orange-500 transition">Tickets</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/faq" className="text-white hover:text-orange-500 transition">FAQ</Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }}>
            <Link to="/contact" className="text-white hover:text-orange-500 transition">Contact</Link>
          </motion.div>
        </nav>

        {/* Menu Burger Mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Mobile Animé */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-2/3 h-full bg-black bg-opacity-95 flex flex-col items-center pt-20 shadow-lg z-50"
          >
            <Link to="/" className="mb-4 text-lg text-white hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
            <Link to="/inscription" className="mb-4 text-lg text-white hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>Inscription</Link>
            <Link to="/awards" className="mb-4 text-lg text-white hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>Awards</Link>
            <Link to="/faq" className="mb-4 text-lg text-white hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
            <Link to="/contact" className="mb-4 text-lg text-white hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
