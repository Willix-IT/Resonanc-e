import styled from 'styled-components';

const DayColumn = styled.div`
  grid-row: 1 / span 24;
  background-color: #fff;
  border-right: 1px solid #ccc;
  position: relative; /* Pour permettre le positionnement des événements */
`;

export default DayColumn;
