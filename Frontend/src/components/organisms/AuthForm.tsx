import React, { useState } from "react";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";

interface AuthFormProps {
  onSubmit: (email: string, password: string, name?: string) => void;
  isRegister?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Gestion du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      if (name) {
        onSubmit(email, password, name); // Assurer que name est défini pour l'inscription
      } else {
        alert("Name is required for registration");
      }
    } else {
      onSubmit(email, password); // Connexion (pas de name)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {isRegister && (
        <FormField
          label="Name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <FormField
        label="Email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormField
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={() => {}}> {isRegister ? "Register" : "Login"} </Button>
    </form>
  );
};

export default AuthForm;
