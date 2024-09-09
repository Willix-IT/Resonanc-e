import React, { useState } from "react";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

interface AuthFormProps {
  onSubmit: (email: string, password: string, name?: string) => void; // Fonction à exécuter lors de la soumission du formulaire
  isRegister?: boolean; // Booléen pour déterminer si c'est une inscription ou une connexion
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isRegister }) => {
  // États pour stocker les valeurs saisies dans le formulaire
  const [name, setName] = useState(""); // Nom de l'utilisateur, utilisé uniquement lors de l'inscription
  const [email, setEmail] = useState(""); // Email de l'utilisateur
  const [password, setPassword] = useState(""); // Mot de passe de l'utilisateur

  // Fonction appelée lorsque le formulaire est soumis
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page à la soumission du formulaire
    if (isRegister) {
      // Si c'est une inscription
      if (name) {
        onSubmit(email, password, name); // Passe l'email, le mot de passe et le nom à la fonction onSubmit
      } else {
        alert("Name is required for registration"); // Alerte si le nom est manquant pour l'inscription
      }
    } else {
      // Si c'est une connexion
      onSubmit(email, password); // Passe l'email et le mot de passe à la fonction onSubmit
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {isRegister && (
        <FormField
          label="Name" // Affiche le champ pour le nom si c'est une inscription
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Met à jour l'état "name" lors de la saisie
        />
      )}
      <FormField
        label="Email" // Champ pour l'email, présent dans les deux cas (inscription et connexion)
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Met à jour l'état "email" lors de la saisie
      />
      <FormField
        label="Password" // Champ pour le mot de passe, présent dans les deux cas
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Met à jour l'état "password" lors de la saisie
      />
      <Button onClick={() => {}}>
        {isRegister ? "Register" : "Login"}
        {/* Bouton dynamique en fonction du type d'action (inscription ou connexion) */}
      </Button>
    </form>
  );
};

export default AuthForm;
