import styled from 'styled-components';

const Paragraph = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export default Paragraph;
