import React from "react";
import styled from "styled-components";
import Title from "../atoms/Title";
import CallToAction from "../molecules/CallToAction";
import NavigationMenu from "../molecules/NavigationMenu";

interface HomeTemplateProps {
  isLoggedIn: boolean;
}

// Styles pour le fond sombre et le cadre centré
const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2c3e50; /* Fond sombre */
`;

const HomeContainer = styled.div`
  background-color: #34495e; /* Couleur du cadre */
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5); /* Ombre pour le cadre */
  text-align: center;
`;

const HomeTemplate: React.FC<HomeTemplateProps> = ({ isLoggedIn }) => (
  <div>
    <NavigationMenu />
    <HomeWrapper>
      <HomeContainer>
        <Title size="large" color="white">
          Welcome to the Home Page
        </Title>
        {isLoggedIn ? (
          <p style={{ color: "white" }}>You are logged in. Enjoy your stay!</p>
        ) : (
          <CallToAction />
        )}
      </HomeContainer>
    </HomeWrapper>
  </div>
);

export default HomeTemplate;
