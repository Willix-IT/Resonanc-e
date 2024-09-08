import React, { useState } from "react";
import styled from "styled-components";
import DayColumnWithEvents from "../molecules/DayColumnWithEvents";
import { createEvent } from "../../services/api";
import Modal from "../molecules/Modal";

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
  grid-template-rows: repeat(24, 60px);
  gap: 1px;
  max-width: 1200px;
  margin: 20px auto;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
`;

const Calendar: React.FC<{ events: any[] }> = ({ events }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );

  const handleTimeSlotClick = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
    setIsModalOpen(true);
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

  return (
    <div>
      <CalendarContainer>
        {[...Array(7)].map((_, dayIndex) => (
          <DayColumnWithEvents
            key={dayIndex}
            dayIndex={dayIndex}
            events={events}
            onTimeSlotClick={handleTimeSlotClick}
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
    </div>
  );
};

export default Calendar;
