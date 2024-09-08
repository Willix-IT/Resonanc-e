import styled from 'styled-components';

interface EventItemProps {
  start: number;
  end: number;
}

const EventItem = styled.div<EventItemProps>`
  background-color: #3498db;
  color: white;
  border-radius: 4px;
  padding: 5px;
  position: absolute;
  top: ${(props) => props.start * 60}px; /* Positionne l'événement */
  height: ${(props) => (props.end - props.start) * 60}px; /* Ajuste la hauteur selon la durée */
  width: calc(100% - 10px); /* Ajuste la largeur pour ne pas déborder */
  margin: 0 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default EventItem;
