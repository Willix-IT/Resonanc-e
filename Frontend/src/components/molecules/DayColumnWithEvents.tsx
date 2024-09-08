import React from 'react';
import DayColumn from '../atoms/DayColumn';
import TimeSlot from '../atoms/TimeSlot';
import EventItem from '../atoms/EventItem';

const DayColumnWithEvents: React.FC<{ dayIndex: number, events: any[], onTimeSlotClick: (timeSlot: any) => void }> = ({ dayIndex, events, onTimeSlotClick }) => {
  return (
    <DayColumn>
      {[...Array(24)].map((_, hourIndex) => (
        <TimeSlot key={hourIndex} onClick={() => onTimeSlotClick({ dayIndex, hourIndex })}>
          {hourIndex}:00
        </TimeSlot>
      ))}
      {events
        .filter((event) => new Date(event.startTime).getDay() === dayIndex)
        .map((event, index) => (
          <EventItem
            key={index}
            start={new Date(event.startTime).getHours()}
            end={new Date(event.endTime).getHours()}
          >
            {event.title}
          </EventItem>
        ))}
    </DayColumn>
  );
};

export default DayColumnWithEvents;
