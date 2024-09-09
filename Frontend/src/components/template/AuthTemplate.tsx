import React from "react";
import styled from "styled-components";
import Title from "../atoms/Title"; // Import du titre comme atom
import AuthForm from "../organisms/AuthForm"; // Import du formulaire d'authentification comme organisme
import NavigationMenu from "../molecules/NavigationMenu"; // Import du menu de navigation comme molécule

interface AuthTemplateProps {
  isRegister: boolean; // Indique s'il s'agit d'une inscription ou d'une connexion
  onSubmit: (email: string, password: string, name?: string) => void; // Fonction déclenchée lors de la soumission du formulaire
}

// Style pour le wrapper de la page d'authentification avec un fond sombre
const AuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2c3e50; /* Fond sombre */
`;

// Style pour le conteneur du formulaire d'authentification
const AuthContainer = styled.div`
  background-color: #34495e; /* Couleur du cadre */
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5); /* Ombre pour le cadre */
  text-align: center;
  width: 400px;
`;

const AuthTemplate: React.FC<AuthTemplateProps> = ({
  isRegister,
  onSubmit,
}) => (
  <div>
    <NavigationMenu /> {/* Affiche le menu de navigation en haut */}
    <AuthWrapper>
      <AuthContainer>
        {/* Affiche le titre, soit "Register" soit "Login" */}
        <Title size="large" color="white">
          {isRegister ? "Register" : "Login"}
        </Title>
        {/* Formulaire d'authentification */}
        <AuthForm isRegister={isRegister} onSubmit={onSubmit} />
      </AuthContainer>
    </AuthWrapper>
  </div>
);

export default AuthTemplate;
