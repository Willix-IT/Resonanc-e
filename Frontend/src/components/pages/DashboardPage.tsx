import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Title from "../atoms/Title";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { getEventsForCurrentWeek } from "../../services/api"; // Appel API pour récupérer les événements de la semaine
import CalendarTemplate from "../template/CalendarTemplate";
import NavigationMenu from "../molecules/NavigationMenu"; // Menu de navigation

// Styles pour le wrapper du Dashboard
const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2c3e50;
  min-height: 100vh;
  padding: 40px;
`;

// Styles pour le conteneur du Dashboard
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
  const [events, setEvents] = useState([]); // Stockage des événements récupérés
  const navigate = useNavigate();

  // Fonction pour déconnecter l'utilisateur
  const handleLogout = () => {
    localStorage.removeItem("token"); // Suppression du token
    window.location.href = "/"; // Redirection vers la page d'accueil
  };

  // Récupération des événements au chargement de la page
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token"); // Récupération du token utilisateur
        if (token) {
          const fetchedEvents = await getEventsForCurrentWeek(token); // Appel API pour récupérer les événements
          setEvents(fetchedEvents); // Mise à jour de l'état avec les événements récupérés
        } else {
          navigate("/login"); // Redirection vers la page de login si aucun token n'est trouvé
        }
      } catch (error: any) {
        console.error("Failed to fetch events:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login"); // Redirection si l'utilisateur n'est pas authentifié
        }
      }
    };

    fetchEvents();
  }, [navigate]);

  return (
    <div>
      <NavigationMenu /> {/* Menu de navigation affiché en haut */}
      <DashboardWrapper>
        <DashboardContainer>
          {/* Titre du Dashboard */}
          <Title size="large" color="white">
            Dashboard
          </Title>
          <p style={{ color: "white" }}>Welcome to your dashboard!</p>
          {/* Bouton de déconnexion */}
          <Button onClick={handleLogout}>Logout</Button>
          {/* Affichage du calendrier avec les événements */}
          <CalendarTemplate events={events} />
        </DashboardContainer>
      </DashboardWrapper>
    </div>
  );
};

export default DashboardPage;
