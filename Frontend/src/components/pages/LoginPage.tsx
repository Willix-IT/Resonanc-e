import React, { useState } from "react";
import AuthTemplate from "../template/AuthTemplate"; // Template pour le formulaire d'authentification
import { loginUser } from "../../services/api"; // Fonction API pour se connecter
import { useNavigate } from "react-router-dom"; // Hook pour rediriger l'utilisateur
import Notification from "../atoms/Notification"; // Notification pour afficher les messages de succès/erreur

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); // Hook pour gérer la navigation
  const [notification, setNotification] = useState<{
    message: string;
    success: boolean;
  } | null>(null); // État pour gérer la notification

  // Fonction pour gérer la soumission du formulaire de login
  const handleLogin = async (email: string, password: string) => {
    try {
      // Appel API pour effectuer la connexion
      const { access_token } = await loginUser(email, password);
      localStorage.setItem("token", access_token); // Stockage du token dans le localStorage
      setNotification({ message: "Login successful", success: true }); // Affichage d'une notification de succès
      navigate("/dashboard"); // Redirection vers le tableau de bord après connexion
    } catch (error: any) {
      // Gestion des erreurs de connexion et affichage d'une notification d'erreur
      setNotification({
        message: `Login failed: ${
          error.response?.data?.message || "Unknown error"
        }`,
        success: false,
      });
    }
  };

  // Rendu du template d'authentification avec le formulaire de connexion et la notification
  return (
    <div>
      {notification && (
        <Notification
          message={notification.message}
          success={notification.success}
          onClose={() => setNotification(null)} // Masquer la notification après un délai
        />
      )}
      <AuthTemplate isRegister={false} onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
