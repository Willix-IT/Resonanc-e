import React, { useState } from "react";
import styled from "styled-components";
import DayColumnWithEvents from "../molecules/DayColumnWithEvents";
import { createEvent, updateEvent } from "../../services/api"; // Import des fonctions API pour créer et mettre à jour des événements
import Modal from "../molecules/Modal"; // Modal pour créer un événement
import EditEventModal from "../molecules/EditEventModal"; // Modal pour éditer un événement

interface EventData {
  title: string; // Titre de l'événement
  startTime: Date; // Heure de début de l'événement
  endTime: Date; // Heure de fin de l'événement
}

interface TimeSlot {
  dayIndex: number; // Index du jour de la semaine (0 pour dimanche)
  hourIndex: number; // Heure de la journée
}

// Styles pour le conteneur du calendrier et les jours de la semaine
const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto repeat(23, 60px);
  gap: 1px;
  max-width: 1200px;
  margin: 20px auto;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
`;

const WeekDays = styled.div`
  grid-column: span 7;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #34495e;
  color: white;
  padding: 10px 0;
  text-align: center;
  border-radius: 8px 8px 0 0;
`;

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Calendar: React.FC<{ events: any[] }> = ({ events }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer l'ouverture de la modal de création d'événement
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // État pour gérer l'ouverture de la modal d'édition d'événement
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  ); // Créneau horaire sélectionné
  const [selectedEvent, setSelectedEvent] = useState<any>(null); // Événement sélectionné

  // Fonction déclenchée lors du clic sur un créneau horaire
  const handleTimeSlotClick = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setIsModalOpen(true);
  };

  // Fonction déclenchée lors du clic sur un événement pour l'éditer
  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  // Fonction pour créer un nouvel événement
  const handleCreateEvent = async (eventData: EventData) => {
    const token = localStorage.getItem("token");
    try {
      await createEvent(token!, eventData); // Appel API pour créer l'événement
      setIsModalOpen(false);
      window.location.reload(); // Rechargement de la page pour refléter les changements
    } catch (error) {
      console.error("Failed to create event:", error); // Gestion des erreurs
    }
  };

  // Fonction pour mettre à jour un événement existant
  const handleUpdateEvent = async (updatedEvent: any) => {
    const token = localStorage.getItem("token");
    try {
      await updateEvent(token!, updatedEvent.id, updatedEvent); // Appel API pour mettre à jour l'événement
      setIsEditModalOpen(false);
      window.location.reload(); // Rechargement de la page pour refléter les modifications
    } catch (error) {
      console.error("Failed to update event:", error); // Gestion des erreurs
    }
  };

  return (
    <div>
      <WeekDays>
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div> // Affichage des jours de la semaine en haut du calendrier
        ))}
      </WeekDays>
      <CalendarContainer>
        {[...Array(7)].map((_, dayIndex) => (
          <DayColumnWithEvents
            key={dayIndex}
            dayIndex={dayIndex}
            events={events}
            onTimeSlotClick={handleTimeSlotClick}
            onEventClick={handleEventClick} // Gestion du clic sur un événement pour l'éditer
          />
        ))}
      </CalendarContainer>

      {/* Modal pour créer un événement */}
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateEvent}
          timeSlot={selectedTimeSlot}
        />
      )}

      {/* Modal pour éditer un événement */}
      {isEditModalOpen && selectedEvent && (
        <EditEventModal
          event={selectedEvent}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateEvent}
        />
      )}
    </div>
  );
};

export default Calendar;
