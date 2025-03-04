import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Form = () => {
  const [formData, setFormData] = useState({
    nom: "",
    instagram: "",
    email: "",
    categorie: "",
    ville: "", 
    description: "",
    photo: null as File | null,
    certificatPhoto: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, photo: e.target.files[0], certificatPhoto: false });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, certificatPhoto: e.target.checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    if (formData.photo && !formData.certificatPhoto) {
      setErrorMessage("❌ Vous devez certifier l’authenticité de la photo.");
      setIsSubmitting(false);
      return;
    }

    const data = new FormData();
    data.append("nom", formData.nom);
    data.append("instagram", formData.instagram);
    data.append("email", formData.email);
    data.append("categorie", formData.categorie);
    data.append("ville", formData.ville);
    data.append("description", formData.description);
    data.append("certificatPhoto", formData.certificatPhoto.toString());
    if (formData.photo) {
      data.append("photo", formData.photo);
    }

    try {
      const response = await axios.post("http://localhost:5094/api/participant/inscription", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setSuccessMessage("✅ Inscription réussie !");
        setFormData({ nom: "", instagram: "", email: "", categorie: "", description: "",ville:"", photo: null, certificatPhoto: false });
      } else {
        setErrorMessage("❌ Une erreur s'est produite. L'adresse email  ou l'instagram est peut-être déjà utilisé.");
      }
    } catch (error) {
      setErrorMessage("❌ Erreur lors de l'inscription. L'adresse email  ou l'instagram est peut-être déjà utilisé.");
    }

    setIsSubmitting(false);
  };

  return (
    <motion.form
      className="max-w-xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg space-y-4"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-orange-500 text-center mb-4">Inscription</h2>

      <input
        type="text"
        name="nom"
        placeholder="Votre Nom"
        value={formData.nom}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-4 focus:ring-orange-500"
      />

      <input
        type="text"
        name="instagram"
        placeholder="Votre Instagram"
        value={formData.instagram}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-4 focus:ring-orange-500"
      />

      <input
        type="email"
        name="email"
        placeholder="Votre Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-4 focus:ring-orange-500"
      />

      <select
        name="categorie"
        value={formData.categorie}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-4 focus:ring-orange-500"
      >
        <option value="">Choisissez votre catégorie</option>
        <option value="Photographe">Photographe</option>
        <option value="Modèle">Modèle</option>
        <option value="MUA">MUA</option>
        <option value="Studio">Studio</option>
        <option value="Photo de l'année">Photo de l'année</option>
      </select>
      <input
        type="text"
        name="ville"
        placeholder="Votre ville"
        value={formData.ville}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-4 focus:ring-orange-500"
      />

      <textarea
        name="description"
        placeholder="Parlez-nous de votre univers... ou de la photo soumise !"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-4 focus:ring-orange-500"
      ></textarea>

      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-4 focus:ring-orange-500"
      />

      {formData.photo && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-700 p-4 rounded-lg"
        >
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={formData.certificatPhoto} onChange={handleCheckboxChange} required />
            <span className="text-sm">
              Je certifie être l’auteur, le modèle ou une personne ayant contribué à la réalisation de la photo soumise. J’atteste également avoir obtenu les autorisations nécessaires ou informer les autres acteurs de la photo pour sa participation au concours et sa diffusion dans le cadre des PortraitFr Awards 2025.
            </span>
          </label>
        </motion.div>
      )}

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full p-3 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 transition"
      >
        {isSubmitting ? "En cours..." : "S'inscrire"}
      </motion.button>
    </motion.form>
  );
};

export default Form;
