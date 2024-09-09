import React from "react";
import styled from "styled-components";
import Title from "../atoms/Title";
import AuthForm from "../organisms/AuthForm";
import NavigationMenu from "../molecules/NavigationMenu";

interface AuthTemplateProps {
  isRegister: boolean;
  onSubmit: (email: string, password: string, name?: string) => void;
}

// Style pour le fond sombre et le cadre centré
const AuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2c3e50; /* Fond sombre */
`;

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
    <NavigationMenu />
    <AuthWrapper>
      <AuthContainer>
        <Title size="large" color="white">
          {isRegister ? "Register" : "Login"}
        </Title>
        <AuthForm isRegister={isRegister} onSubmit={onSubmit} />
      </AuthContainer>
    </AuthWrapper>
  </div>
);

export default AuthTemplate;
