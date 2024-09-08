import React, { useEffect, useState } from "react";
import Title from "../atoms/Title";
import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { getEventsForCurrentWeek } from "../../services/api"; // Appel API depuis api.ts
import CalendarTemplate from "../template/CalendarTemplate";

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
      <Title size="large">Dashboard</Title>
      <p>Welcome to your dashboard!</p>
      <Button onClick={handleLogout}>Logout</Button>

      {/* Affichage du calendrier avec les événements */}
      <CalendarTemplate events={events} />
    </div>
  );
};

export default DashboardPage;
