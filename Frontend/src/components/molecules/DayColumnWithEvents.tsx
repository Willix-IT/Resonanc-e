import React from "react";
import DayColumn from "../atoms/DayColumn";
import TimeSlot from "../atoms/TimeSlot";
import EventItem from "../atoms/EventItem";

interface DayColumnWithEventsProps {
  dayIndex: number; // Index du jour de la semaine (0 pour Dimanche, 6 pour Samedi)
  events: any[]; // Liste des événements associés à ce jour
  onTimeSlotClick: (timeSlot: any) => void; // Fonction déclenchée lorsqu'un créneau horaire est cliqué
  onEventClick: (event: any) => void; // Fonction déclenchée lorsqu'un événement est cliqué
}

const DayColumnWithEvents: React.FC<DayColumnWithEventsProps> = ({
  dayIndex,
  events,
  onTimeSlotClick,
  onEventClick,
}) => {
  return (
    <DayColumn>
      {/* Création des créneaux horaires de 0 à 23 heures */}
      {[...Array(24)].map((_, hourIndex) => (
        <TimeSlot
          key={hourIndex}
          onClick={() => onTimeSlotClick({ dayIndex, hourIndex })}
        >
          {hourIndex}:00
        </TimeSlot>
      ))}

      {/* Filtrage des événements qui correspondent au jour actuel et affichage */}
      {events
        .filter((event) => new Date(event.startTime).getDay() === dayIndex)
        .map((event, index) => (
          <EventItem
            key={index}
            start={new Date(event.startTime).getHours()}
            end={new Date(event.endTime).getHours()}
            onClick={() => onEventClick(event)} // Déclenchement lors du clic sur un événement
          >
            {event.title} {/* Affichage du titre de l'événement */}
          </EventItem>
        ))}
    </DayColumn>
  );
};

export default DayColumnWithEvents;
