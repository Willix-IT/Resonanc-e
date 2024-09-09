import React from "react";
import Calendar from "../organisms/Calendar";
import Title from "../atoms/Title"; // Assume qu'il existe un Atom pour le titre

const CalendarTemplate: React.FC<{ events: any[] }> = ({ events }) => {
  return (
    <div>
      <Title size="large" color="white">
        Your Calendar
      </Title>
      <Calendar events={events} />
    </div>
  );
};

export default CalendarTemplate;
