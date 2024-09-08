import React from 'react';
import styled from 'styled-components';
import DayColumnWithEvents from '../molecules/DayColumnWithEvents';

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 jours */
  grid-template-rows: repeat(24, 60px);  /* 24 heures */
  gap: 1px;
  max-width: 1200px; /* Largeur maximale */
  margin: 20px auto; /* Centrer le calendrier */
  background-color: #f0f0f0; /* Arrière-plan léger */
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1); /* Ajout d'une ombre */
`;

const Calendar: React.FC<{ events: any[] }> = ({ events }) => {
  return (
    <CalendarContainer>
      {[...Array(7)].map((_, dayIndex) => (
        <DayColumnWithEvents key={dayIndex} dayIndex={dayIndex} events={events} />
      ))}
    </CalendarContainer>
  );
};

export default Calendar;
