import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:5094/api/contact", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setSuccessMessage("✅ Message envoyé avec succès !");
        setFormData({ nom: "", email: "", message: "" });
      } else {
        setErrorMessage("❌ Une erreur s'est produite.");
      }
    } catch (error) {
      setErrorMessage("❌ Erreur lors de l'envoi du message.");
    }

    setIsSubmitting(false);
  };

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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-3xl bg-black/70 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-orange-500 text-center mb-6">Contactez-nous</h1>
        <p className="text-center text-gray-300 mb-6">
          Une question ? Une collaboration ? Remplissez ce formulaire et nous vous répondrons rapidement !
        </p>

        {errorMessage && <motion.div className="text-center text-red-400 text-xl">{errorMessage}</motion.div>}
        {successMessage && <motion.div className="text-center text-green-400 text-xl">{successMessage}</motion.div>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="nom"
            placeholder="Votre Nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 text-white outline-none focus:ring-4 focus:ring-orange-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Votre Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-gray-800 text-white outline-none focus:ring-4 focus:ring-orange-500"
            required
          />
          <textarea
            name="message"
            placeholder="Votre Message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full p-4 rounded-xl bg-gray-800 text-white outline-none focus:ring-4 focus:ring-orange-500"
            required
          ></textarea>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-4 rounded-xl bg-orange-500 text-white font-bold hover:bg-orange-600 transition"
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
