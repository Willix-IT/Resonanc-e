import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Title from "../atoms/Title";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { getEventsForCurrentWeek } from "../../services/api"; // Appel API depuis api.ts
import CalendarTemplate from "../template/CalendarTemplate";
import NavigationMenu from "../molecules/NavigationMenu";

// Styles pour centrer le contenu et appliquer un fond sombre
const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2c3e50;
  min-height: 100vh;
  padding: 40px;
`;

const DashboardContainer = styled.div`
  background-color: #34495e;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.5);
  max-width: 1200px;
  width: 100%;
  text-align: center;
`;

const DashboardPage: React.FC = () => {
  const [events, setEvents] = useState([]); // État pour stocker les événements
  const navigate = useNavigate();

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Utilisation de useEffect pour récupérer les événements
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const fetchedEvents = await getEventsForCurrentWeek(token); // Appel à l'API via api.ts
          setEvents(fetchedEvents); // Mise à jour des événements
        } else {
          navigate("/login"); // Rediriger vers la page de login si le token est manquant
        }
      } catch (error: any) {
        console.error("Failed to fetch events:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login"); // Redirection si non authentifié
        }
      }
    };

    fetchEvents();
  }, [navigate]);

  return (
    <div>
      <NavigationMenu />
      <DashboardWrapper>
        <DashboardContainer>
          <Title size="large" color="white">
            Dashboard
          </Title>
          <p style={{ color: "white" }}>Welcome to your dashboard!</p>
          <Button onClick={handleLogout}>Logout</Button>
          <CalendarTemplate events={events} />
        </DashboardContainer>
      </DashboardWrapper>
    </div>
  );
};

export default DashboardPage;
