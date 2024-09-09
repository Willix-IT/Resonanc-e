import React, { useState } from "react";
import AuthTemplate from "../template/AuthTemplate"; // Template pour le formulaire d'inscription
import { registerUser } from "../../services/api"; // Fonction API pour s'inscrire
import { useNavigate } from "react-router-dom"; // Hook pour la navigation
import Notification from "../atoms/Notification"; // Notification pour afficher les messages de succès/erreur

const RegisterPage: React.FC = () => {
  const navigate = useNavigate(); // Hook pour gérer la navigation
  const [notification, setNotification] = useState<{
    message: string;
    success: boolean;
  } | null>(null); // État pour gérer la notification

  // Fonction pour gérer la soumission du formulaire d'inscription
  const handleRegister = async (
    email: string,
    password: string,
    name?: string
  ) => {
    try {
      // Appel API pour créer un nouvel utilisateur
      const result = await registerUser(name!, email, password);
      setNotification({ message: result.message, success: true }); // Affichage d'une notification de succès
      navigate("/login"); // Redirection vers la page de connexion après inscription
    } catch (error: any) {
      // Gestion des erreurs d'inscription et affichage d'une notification d'erreur
      setNotification({
        message: `Registration failed: ${
          error.response?.data?.message || "Unknown error"
        }`,
        success: false,
      });
    }
  };

  // Rendu du template d'authentification avec le formulaire d'inscription et la notification
  return (
    <div>
      {notification && (
        <Notification
          message={notification.message}
          success={notification.success}
          onClose={() => setNotification(null)} // Masquer la notification après un délai
        />
      )}
      <AuthTemplate isRegister={true} onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;
