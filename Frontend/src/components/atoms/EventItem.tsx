import React from 'react';
import styled from 'styled-components';

interface EventItemProps {
  children : React.ReactNode;
  start: number;
  end: number;
  onClick: () => void; // Ajout de l'événement onClick
}

const EventItem = styled.div<EventItemProps>`
  background-color: #3498db;
  color: white;
  border-radius: 4px;
  padding: 10px;
  position: absolute;
  top: ${(props) => props.start * 60}px;
  height: ${(props) => (props.end - props.start) * 60}px;
  width: calc(100% - 10px);
  margin: 0 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal;
  cursor: pointer; /* Ajoute un curseur pointeur */
`;

const EventItemComponent: React.FC<EventItemProps> = ({ start, end, children, onClick }) => {
  return (
    <EventItem start={start} end={end} onClick={onClick}>
      {children}
    </EventItem>
  );
};

export default EventItemComponent;
