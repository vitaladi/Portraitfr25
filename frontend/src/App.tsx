import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Inscription from "./pages/Inscription";
import Participants from "./pages/Participants";
import Partners from "./pages/Partners";
import Home from "./pages/Home";
import Tickets from "./pages/Tickets";
import Awards from "./pages/Awards";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import ScrollProgress from "./components/ScrollProgress";
import Header from "./components/Header";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/inscription" element={<PageTransition><Inscription /></PageTransition>} />
        <Route path="/participants" element={<PageTransition><Participants /></PageTransition>} />
        <Route path="/partners" element={<PageTransition><Partners /></PageTransition>} />
        <Route path="/awards" element={<PageTransition><Awards /></PageTransition>} />
        <Route path="/tickets" element={<PageTransition><Tickets /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />

      </Routes>
    </AnimatePresence>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <Router>
      <ScrollProgress />
      <Header />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
