import React, { useState } from "react";
import styled from "styled-components";
import DayColumnWithEvents from "../molecules/DayColumnWithEvents";
import { createEvent, updateEvent } from "../../services/api"; // Import de la fonction update
import Modal from "../molecules/Modal";
import EditEventModal from "../molecules/EditEventModal"; // Modal pour l'édition d'événements

interface EventData {
  title: string;
  startTime: Date;
  endTime: Date;
}

interface TimeSlot {
  dayIndex: number;
  hourIndex: number;
}

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto repeat(23, 60px);  // Ligne ajoutée pour les jours de la semaine
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

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Calendar: React.FC<{ events: any[] }> = ({ events }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Nouvel état pour la modal d'édition
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );
  const [selectedEvent, setSelectedEvent] = useState<any>(null); // État pour l'événement sélectionné

  const handleTimeSlotClick = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: any) => {
    // Fonction pour gérer le clic sur un événement
    setSelectedEvent(event);
    setIsEditModalOpen(true); // Ouvre la modal d'édition
  };

  const handleCreateEvent = async (eventData: EventData) => {
    const token = localStorage.getItem("token");
    try {
      await createEvent(token!, eventData);
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  const handleUpdateEvent = async (updatedEvent: any) => {
    // Fonction pour mettre à jour un événement
    const token = localStorage.getItem("token");
    try {
      await updateEvent(token!, updatedEvent.id, updatedEvent); // Appel à l'API updateEvent
      setIsEditModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update event:", error);
    }
  };

  return (
    <div>
      <WeekDays>
          {daysOfWeek.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </WeekDays>
      <CalendarContainer>
        
        {[...Array(7)].map((_, dayIndex) => (
          <DayColumnWithEvents
            key={dayIndex}
            dayIndex={dayIndex}
            events={events}
            onTimeSlotClick={handleTimeSlotClick}
            onEventClick={handleEventClick} // Ajout de la fonction onEventClick
          />
        ))}
      </CalendarContainer>

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateEvent}
          timeSlot={selectedTimeSlot}
        />
      )}

      {isEditModalOpen &&
        selectedEvent && ( // Affiche la modal d'édition
          <EditEventModal
            event={selectedEvent}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleUpdateEvent} // Sauvegarde des modifications
          />
        )}
    </div>
  );
};

export default Calendar;
